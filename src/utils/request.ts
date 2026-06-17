import un from '@uni-helper/uni-network'

const BASE_URL = `${import.meta.env.BASE_PROTOCOL}://${import.meta.env.BASE_HOST}:${import.meta.env.BASE_PORT}${import.meta.env.BASE_URL}`

const request = un.create({
  baseURL: BASE_URL,
  timeout: 15000,
  header: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = uni.getStorageSync('token')
    if (token) {
      config.header = {
        ...config.header,
        Authorization: `Bearer ${token}`,
      }
    }
    return config
  },
  error => Promise.reject(error),
)

// 响应拦截器
request.interceptors.response.use(
  (response: any) => {
    const { statusCode, data } = response

    // HTTP 层面失败
    if (statusCode !== 200 && statusCode !== 0) {
      uni.showToast({ title: `请求失败(${statusCode})`, icon: 'none' })
      return Promise.reject(new Error(`HTTP ${statusCode}`))
    }

    // 业务层：{ code, msg, data }
    if (data.code === 200) {
      return data.data
    }

    // token 过期或未授权
    if (data.code === 401 || statusCode === 401) {
      uni.removeStorageSync('token')
      uni.reLaunch({ url: '/pages/login' })
      return Promise.reject(new Error('登录已过期'))
    }

    // 其他业务错误
    uni.showToast({ title: data.msg || '请求失败', icon: 'none' })
    return Promise.reject(data)
  },
  (error) => {
    uni.showToast({ title: '网络异常，请稍后重试', icon: 'none' })
    return Promise.reject(error)
  },
)

/** 新增 - POST */
export function post<T = any>(url: string, data?: Record<string, any>, config?: Record<string, any>) {
  return request.post<T>(url, data, config)
}

/** 删除 - DELETE */
export function del<T = any>(url: string, data?: Record<string, any>, config?: Record<string, any>) {
  return request.delete<T>(url, { data, ...config })
}

/** 查询（列表）- POST */
export function query<T = any>(url: string, data?: Record<string, any>, config?: Record<string, any>) {
  return request.post<T>(url, data, config)
}

/** 编辑 - POST */
export function edit<T = any>(url: string, data?: Record<string, any>, config?: Record<string, any>) {
  return request.post<T>(url, data, config)
}

/** 查单条 - GET */
export function get<T = any>(url: string, params?: Record<string, any>, config?: Record<string, any>) {
  return request.get<T>(url, { params, ...config })
}

export default request
