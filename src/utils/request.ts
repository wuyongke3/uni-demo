import un from '@uni-helper/uni-network'

const BASE_URL = `${import.meta.env.BASE_PROTOCOL}://${import.meta.env.BASE_HOST}:${import.meta.env.BASE_PORT}${import.meta.env.BASE_URL}`

const request = un.create({
  baseURL: BASE_URL,
  timeout: 15000,
  header: {
    'Content-Type': 'application/json',
  },
})

// ==================== 类型定义 ====================

/** 分页查询参数 */
export interface PageParams {
  limit?: number
  page?: number
  start?: number
  sort?: string
}

/** 分页列表响应 */
export interface PageResult<T = any> {
  list: T[]
  total: number
}

/** API 统一响应结构 */
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// ==================== 拦截器 ====================

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

request.interceptors.response.use(
  (response: any) => {
    const { statusCode, data } = response

    // HTTP 层面失败
    if (statusCode !== 200 && statusCode !== 0) {
      uni.showToast({ title: `请求失败(${statusCode})`, icon: 'none' })
      return Promise.reject(new Error(`HTTP ${statusCode}`))
    }

    // 业务成功（code === 0）
    if (data.code === 0) {
      return data.data
    }

    // token 过期或未授权
    if (data.code === 401 || statusCode === 401) {
      uni.removeStorageSync('token')
      uni.reLaunch({ url: '/pages/login' })
      return Promise.reject(new Error('登录已过期'))
    }

    // 其他业务错误（使用 message 字段）
    uni.showToast({ title: data.message || '请求失败', icon: 'none' })
    return Promise.reject(data)
  },
  (error) => {
    uni.showToast({ title: '网络异常，请稍后重试', icon: 'none' })
    return Promise.reject(error)
  },
)

// ==================== 5 个标准接口 ====================

/**
 * 分页列表查询 - POST /{module}/all
 * @example queryList<lecturers>('lecturers', { limit: 10, page: 1 })
 */
export function queryList<T = any>(module: string, params?: PageParams, config?: Record<string, any>) {
  return request.post<PageResult<T>>(`/${module}/all`, params, config)
}

/**
 * 查询详情 - GET /{module}/info/:ids
 * @example getInfo<lecturers>('lecturers', '1')
 * @example getInfo<lecturers>('lecturers', '1,2,3')  // 批量
 */
export function getInfo<T = any>(module: string, ids: string | number, config?: Record<string, any>) {
  return request.get<T>(`/${module}/info/${ids}`, config)
}

/**
 * 新增记录 - POST /{module}/add
 * @example addRecord<lecturers>('lecturers', { name: '张三', no: 'T001' })
 */
export function addRecord<T = any>(module: string, data: Record<string, any>, config?: Record<string, any>) {
  return request.post<T>(`/${module}/add`, data, config)
}

/**
 * 编辑记录 - POST /{module}/modify/:id
 * 只传需要更新的字段即可
 * @example modifyRecord<lecturers>('lecturers', 1, { name: '张三丰' })
 */
export function modifyRecord<T = any>(module: string, id: string | number, data: Record<string, any>, config?: Record<string, any>) {
  return request.post<T>(`/${module}/modify/${id}`, data, config)
}

/**
 * 批量删除 - DELETE /{module}/delete/:ids
 * @example deleteRecords('lecturers', '1')
 * @example deleteRecords('lecturers', '1,2,3')  // 批量
 */
export function deleteRecords(module: string, ids: string | number, config?: Record<string, any>) {
  return request.delete(`/${module}/delete/${ids}`, config)
}

// ==================== 通用方法（保留兼容） ====================

/** 通用 POST */
export function post<T = any>(url: string, data?: Record<string, any>, config?: Record<string, any>) {
  return request.post<T>(url, data, config)
}

/** 通用 DELETE */
export function del<T = any>(url: string, data?: Record<string, any>, config?: Record<string, any>) {
  return request.delete<T>(url, { data, ...config })
}

/** 通用 GET */
export function get<T = any>(url: string, params?: Record<string, any>, config?: Record<string, any>) {
  return request.get<T>(url, { params, ...config })
}

export default request
