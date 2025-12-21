import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/lib/api.ts:18',message:'API Request',data:{method:config.method,url:config.url,hasToken:!!this.getToken()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        const token = this.getToken()
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor to handle token refresh
    this.client.interceptors.response.use(
      (response) => {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/lib/api.ts:30',message:'API Response Success',data:{status:response.status,url:response.config.url,dataType:Array.isArray(response.data)?'array':typeof response.data},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        return response
      },
      async (error) => {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/lib/api.ts:32',message:'API Response Error',data:{status:error.response?.status,url:error.config?.url,message:error.response?.data?.message||error.message,is401:error.response?.status===401},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,E'})}).catch(()=>{});
        // #endregion
        const originalRequest = error.config

        // If 401 and we haven't retried yet, try to refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            const refreshToken = this.getRefreshToken()
            // #region agent log
            fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/lib/api.ts:40',message:'Token Refresh Attempt',data:{hasRefreshToken:!!refreshToken},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
            // #endregion
            if (refreshToken) {
              const { data } = await axios.post(`${API_URL}/auth/refresh`, {
                refreshToken,
              })

              this.setTokens(data.accessToken, data.refreshToken)
              originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
              // #region agent log
              fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/lib/api.ts:48',message:'Token Refresh Success',data:{hasNewToken:!!data.accessToken},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
              // #endregion
              
              return this.client(originalRequest)
            }
          } catch (refreshError: any) {
            // #region agent log
            fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/lib/api.ts:52',message:'Token Refresh Failed',data:{error:refreshError?.message||String(refreshError)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
            // #endregion
            // Refresh failed, logout user
            this.clearTokens()
            if (typeof window !== 'undefined') {
              window.location.href = '/auth/login'
            }
            return Promise.reject(refreshError)
          }
        }

        return Promise.reject(error)
      }
    )
  }

  // Token management
  private getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('accessToken')
  }

  private getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('refreshToken')
  }

  setTokens(accessToken: string, refreshToken: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    }
  }

  clearTokens() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
    }
  }

  // Generic HTTP methods
  async get<T>(url: string, config?: AxiosRequestConfig) {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/lib/api.ts:92',message:'GET Request',data:{url},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    const response = await this.client.get<T>(url, config)
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/lib/api.ts:95',message:'GET Response',data:{url,status:response.status,isArray:Array.isArray(response.data),hasData:!!response.data,hasMeta:!!(response.data as any)?.meta},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    return response.data
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.client.post<T>(url, data, config)
    return response.data
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.client.put<T>(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.client.delete<T>(url, config)
    return response.data
  }

  async upload<T>(url: string, formData: FormData, config?: AxiosRequestConfig) {
    // #region agent log
    const fileInfo = formData.get('file') as File | null;
    fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/lib/api.ts:112',message:'Upload Request',data:{url,fileName:fileInfo?.name,fileSize:fileInfo?.size,fileType:fileInfo?.type},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    const response = await this.client.post<T>(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    })
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/lib/api.ts:121',message:'Upload Response',data:{url,status:response.status,hasData:!!response.data},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    return response.data
  }
}

export const api = new ApiClient()
