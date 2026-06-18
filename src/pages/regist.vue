<script setup lang="ts">
import { reactive, ref } from 'vue'
import { addRecord } from '@/utils/request'

// 角色类型
type UserRole = 'lecturer' | 'student'

const role = ref<UserRole>('student')

// 表单数据
const formData = reactive({
  name: '',
  password: '',
})

const showPassword = ref(false)
const loading = ref(false)
const agreed = ref(true)

/** 角色选项 */
const roleOptions: { value: UserRole, label: string }[] = [
  { value: 'student', label: '学生' },
  { value: 'lecturer', label: '讲师' },
]

/** 根据角色获取注册接口路径 */
function getRegisterUrl(role: UserRole): string {
  return `/auth/${role}/register`
}

/** 表单校验 */
function validate(): boolean {
  if (!formData.name.trim()) {
    uni.showToast({ title: '请输入姓名', icon: 'none' })
    return false
  }
  if (formData.name.length > 50) {
    uni.showToast({ title: '姓名不能超过50个字符', icon: 'none' })
    return false
  }
  if (!formData.password) {
    uni.showToast({ title: '请输入密码', icon: 'none' })
    return false
  }
  if (formData.password.length < 6 || formData.password.length > 30) {
    uni.showToast({ title: '密码长度为6-30个字符', icon: 'none' })
    return false
  }
  if (!agreed.value) {
    uni.showToast({ title: '请先同意用户协议', icon: 'none' })
    return false
  }
  return true
}

/** 提交注册 */
async function handleRegister() {
  if (!validate())
    return

  loading.value = true
  try {
    await addRecord(getRegisterUrl(role.value), {
      name: formData.name.trim(),
      password: formData.password,
    })

    uni.showToast({ title: '注册成功', icon: 'success' })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }
  catch {
    // 错误已在拦截器中统一处理
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <view class="regist-page">
    <view class="regist-header">
      <image class="logo" src="/static/logo.png" mode="aspectFit" />
      <text class="title">用户注册</text>
      <text class="subtitle">创建账号，开启学习之旅</text>
    </view>

    <view class="regist-form">
      <!-- 角色选择 -->
      <view class="form-item role-select">
        <text class="label">身份</text>
        <view class="role-options">
          <view
            v-for="item in roleOptions" :key="item.value" class="role-option"
            :class="{ active: role === item.value }" @click="role = item.value"
          >
            {{ item.label }}
          </view>
        </view>
      </view>

      <view class="form-item">
        <input
          v-model="formData.name" type="text" maxlength="50" placeholder="请输入姓名" class="form-input"
          placeholder-style="color: #999"
        >
      </view>

      <view class="form-item">
        <input
          v-model="formData.password" :type="showPassword ? 'text' : 'password'" maxlength="30"
          placeholder="请输入密码（6-30位）" class="form-input" placeholder-style="color: #999"
        >
        <text class="toggle-pwd" @click="showPassword = !showPassword">
          {{ showPassword ? '隐藏' : '显示' }}
        </text>
      </view>

      <button class="regist-btn" :loading="loading" @click="handleRegister">
        注 册
      </button>
    </view>

    <!-- 已有账号 -->
    <view class="login-link" @click="uni.navigateTo({ url: '/pages/login' })">
      已有账号？<text class="link">去登录</text>
    </view>

    <view class="agreement">
      <label @click="agreed = !agreed">
        <checkbox :checked="agreed" color="#07c160" />
        <text class="agree-text">我已阅读并同意<text class="link">《用户协议》</text>和<text class="link">《隐私政策》</text></text>
      </label>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.regist-page {
    min-height: 100vh;
    padding: 120rpx 60rpx;
    background: linear-gradient(180deg, #07c160 0%, #f5f5f5 40%);
}

.regist-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 60rpx;

    .logo {
        width: 160rpx;
        height: 160rpx;
        border-radius: 32rpx;
        margin-bottom: 30rpx;
        background: #fff;
    }

    .title {
        font-size: 44rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 16rpx;
    }

    .subtitle {
        font-size: 28rpx;
        color: #999;
    }
}

.regist-form {
    background: #fff;
    border-radius: 24rpx;
    padding: 40rpx 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
}

.form-item {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    border-bottom: 1rpx solid #eee;
    padding: 24rpx 0;

    &.role-select {
        border-bottom: none;
        margin-bottom: -10rpx;

        .label {
            font-size: 28rpx;
            color: #666;
            margin-right: 20rpx;
            white-space: nowrap;
        }
    }

    .form-input {
        flex: 1;
        font-size: 30rpx;
        height: 48rpx;
        position: relative;
        z-index: 10;
        background: transparent;
        color: #333;
    }

    .toggle-pwd {
        font-size: 26rpx;
        color: #07c160;
        padding: 0 10rpx;
    }
}

.role-options {
    display: flex;
    gap: 20rpx;
    flex: 1;
}

.role-option {
    flex: 1;
    text-align: center;
    padding: 16rpx 0;
    font-size: 28rpx;
    color: #666;
    border: 2rpx solid #ddd;
    border-radius: 12rpx;
    transition: all 0.2s;

    &.active {
        color: #07c160;
        border-color: #07c160;
        background: rgba(7, 193, 96, 0.05);
    }
}

.regist-btn {
    margin-top: 50rpx;
    height: 90rpx;
    line-height: 90rpx;
    background: linear-gradient(135deg, #07c160, #06ad56);
    color: #fff;
    font-size: 32rpx;
    font-weight: bold;
    border-radius: 45rpx;
    border: none;

    &[disabled] {
        opacity: 0.6;
    }
}

.login-link {
    text-align: center;
    margin-top: 40rpx;
    font-size: 28rpx;
    color: #999;

    .link {
        color: #07c160;
    }
}

.agreement {
    position: fixed;
    bottom: 60rpx;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;

    .agree-text {
        font-size: 24rpx;
        color: #999;
    }

    .link {
        color: #07c160;
    }
}
</style>
