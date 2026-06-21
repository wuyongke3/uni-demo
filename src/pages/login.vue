<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

const BASE_URL = 'http://127.0.0.1:8000/api/v1'

// 角色类型
type UserRole = 'lecturer' | 'student'

const role = ref<UserRole>('student')

// 表单数据
const formData = reactive({
  account: '',
  password: '',
})

// 状态
const showPassword = ref(false)
const loading = ref(false)
const agreed = ref(true)
const canUseWechat = ref(false)

/** 角色选项 */
const roleOptions: { value: UserRole, label: string }[] = [
  { value: 'student', label: '学生' },
  { value: 'lecturer', label: '讲师' },
]

// 检测是否支持微信登录
onMounted(() => {
  // #ifdef MP-WEIXIN
  canUseWechat.value = true
  // #endif

  // #ifdef APP-PLUS
  canUseWechat.value = plus.runtime.isApplicationExist({ pname: 'com.tencent.mm' })
  // #endif
})

// 账号密码登录
function handleLogin() {
  if (!formData.account || !formData.password) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' })
    return
  }
  if (!agreed.value) {
    uni.showToast({ title: '请先同意用户协议', icon: 'none' })
    return
  }

  loading.value = true
  const url = `${BASE_URL}/auth/${role.value}/login`

  uni.request({
    url,
    method: 'POST',
    header: { 'Content-Type': 'application/json' },
    data: {
      name: formData.account,
      password: formData.password,
    },
    success(res) {
      if (res.statusCode === 200 && res.data?.code === 0) {
        const data = res.data.data || {}
        if (data.token) {
          uni.setStorageSync('token', data.token)
        }
        uni.showToast({ title: '登录成功', icon: 'success' })
        setTimeout(() => {
          uni.redirectTo({ url: '/pages/me' })
        }, 1500)
      }
      else {
        uni.showToast({ title: res.data?.message || '登录失败', icon: 'none' })
      }
    },
    fail() {
      uni.showToast({ title: '网络异常', icon: 'none' })
    },
    complete() {
      loading.value = false
    },
  })
}

// 微信登录
async function handleWechatLogin() {
  if (!agreed.value) {
    uni.showToast({ title: '请先同意用户协议', icon: 'none' })
    return
  }

  // #ifdef MP-WEIXIN
  try {
    const loginRes = await uni.login({ provider: 'weixin' })

    // 获取用户信息（需用户授权）
    const userProfile = await uni.getUserProfile({
      desc: '用于完善会员资料',
    })

    // TODO: 将 code 发送到后端换取 openid 和 session_key
    console.log('微信登录 code:', loginRes.code)
    console.log('用户信息:', userProfile)

    uni.showToast({ title: '微信登录成功', icon: 'success' })
  }
  catch (error: any) {
    if (error.errMsg?.includes('cancel')) {
      return
    }
    uni.showToast({ title: '微信登录失败', icon: 'none' })
  }
  // #endif

  // #ifdef APP-PLUS
  try {
    const authResult = await uni.login({
      provider: 'weixin',
      onlyAuthorize: true,
    } as any)

    // 获取 auth code，发送到后端
    console.log('App端微信登录:', authResult.authResult)
    uni.showToast({ title: '微信登录成功', icon: 'success' })
  }
  catch (error: any) {
    uni.showToast({ title: error.errMsg || '微信登录失败', icon: 'none' })
  }
  // #endif

  // #ifndef MP-WEIXIN || APP-PLUS
  uni.showToast({ title: '当前环境不支持微信登录', icon: 'none' })
  // #endif
}
</script>

<template>
  <view class="login-page">
    <view class="login-header">
      <image class="logo" src="/static/logo.png" mode="aspectFit" />
      <text class="title">欢迎登录</text>
      <text class="subtitle">登录后享受更多服务</text>
    </view>

    <view class="login-form">
      <!-- 角色选择 -->
      <view class="form-item role-select">
        <text class="label">身份</text>
        <view class="role-options">
          <view
            v-for="item in roleOptions"
            :key="item.value"
            class="role-option"
            :class="{ active: role === item.value }"
            @click="role = item.value"
          >
            {{ item.label }}
          </view>
        </view>
      </view>

      <view class="form-item">
        <input
          v-model="formData.account"
          type="text"
          placeholder="请输入账号"
          class="form-input"
          placeholder-style="color: #999"
        >
      </view>

      <view class="form-item">
        <input
          v-model="formData.password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="请输入密码"
          class="form-input"
          placeholder-style="color: #999"
        >
        <text class="toggle-pwd" @click="showPassword = !showPassword">
          {{ showPassword ? '隐藏' : '显示' }}
        </text>
      </view>

      <button class="login-btn" :loading="loading" @click="handleLogin">
        登 录
      </button>

      <!-- 注册入口 -->
      <view class="regist-link">
        没有账号？<text class="link" @click="uni.navigateTo({ url: '/pages/regist' })">立即注册</text>
      </view>
    </view>

    <!-- 微信登录 -->
    <view v-if="canUseWechat" class="wechat-login">
      <view class="divider">
        <view class="line" />
        <text class="divider-text">其他登录方式</text>
        <view class="line" />
      </view>
      <view class="wechat-btn" @click="handleWechatLogin">
        <image class="wechat-icon" src="/static/wechat.png" mode="aspectFit" />
        <text>微信登录</text>
      </view>
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
.login-page {
  min-height: 100vh;
  padding: 120rpx 60rpx;
  background: linear-gradient(180deg, #07c160 0%, #f5f5f5 40%);
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80rpx;

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

.login-form {
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
    color: #333;
    position: relative;
    z-index: 10;
    background: transparent;
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

.login-btn {
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

.regist-link {
  text-align: center;
  margin-top: 30rpx;
  font-size: 28rpx;
  color: #999;

  .link {
    color: #07c160;
  }
}

.wechat-login {
  margin-top: 80rpx;

  .divider {
    display: flex;
    align-items: center;
    margin-bottom: 50rpx;

    .line {
      flex: 1;
      height: 1rpx;
      background: #ddd;
    }

    .divider-text {
      font-size: 24rpx;
      color: #999;
      padding: 0 30rpx;
    }
  }

  .wechat-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12rpx;
    font-size: 28rpx;
    color: #07c160;

    .wechat-icon {
      width: 48rpx;
      height: 48rpx;
    }
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
