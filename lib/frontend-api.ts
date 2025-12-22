const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1'

// Check if we're in build time and API URL is localhost (not set)
// During build, if API URL is localhost, we can't fetch, so return empty data
const isLocalhostAPI = API_URL.includes('localhost') || API_URL.includes('127.0.0.1')
const isBuildTime = typeof window === 'undefined' && process.env.NODE_ENV === 'production' && isLocalhostAPI

interface FetchOptions {
  method?: string
  body?: any
  cache?: RequestCache
  revalidate?: number
}

async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  // During build time, if API URL is localhost (not set), return empty data instead of failing
  if (isBuildTime && isLocalhostAPI) {
    console.warn('[Frontend API] WARNING: Using localhost API URL in production build. Set NEXT_PUBLIC_API_URL environment variable. Returning empty data.')
    
    // Return appropriate empty data structure based on endpoint
    if (endpoint.includes('/blog')) {
      return { data: [], meta: { totalPages: 1, currentPage: 1, total: 0 } } as T
    }
    if (endpoint.includes('/careers')) {
      return [] as T
    }
    if (endpoint.includes('/solutions')) {
      return [] as T
    }
    if (endpoint.includes('/team')) {
      return [] as T
    }
    if (endpoint.includes('/settings')) {
      return {} as T
    }
    if (endpoint.includes('/accessibility')) {
      return {} as T
    }
    if (endpoint.includes('/pages')) {
      return [] as T
    }
    // Default empty response
    return [] as T
  }

  const { method = 'GET', body, cache, revalidate } = options

  const config: RequestInit & { next?: { revalidate?: number } } = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  // Set cache options - only one should be set
  if (revalidate !== undefined) {
    // Use Next.js revalidation (for ISR)
    config.next = { revalidate }
  } else if (cache !== undefined) {
    // Use explicit cache option
    config.cache = cache
  } else {
    // Default to force-cache for GET requests
    config.cache = 'force-cache'
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const fullUrl = `${API_URL}${endpoint}`
  
  // Warn if using localhost in production runtime
  if (process.env.NODE_ENV === 'production' && !isBuildTime && isLocalhostAPI) {
    console.warn('[Frontend API] WARNING: Using localhost API URL in production. Set NEXT_PUBLIC_API_URL environment variable.')
  }
  
  try {
    console.log(`[Frontend API] Fetching: ${fullUrl}`)
    const response = await fetch(fullUrl, config)

    if (!response.ok) {
      const errorText = await response.text().catch(() => response.statusText)
      console.error(`[Frontend API] Error ${response.status}:`, errorText)
      throw new Error(`API Error ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    console.log(`[Frontend API] Success: ${fullUrl}`)
    return data
  } catch (error: any) {
    console.error(`[Frontend API] Failed: ${fullUrl}`, error)
    throw error
  }
}

export const frontendApi = {
  // Pages
  // Note: Pages have export const revalidate = 3600, so we don't need to pass revalidate here
  getPages: () => fetchAPI<any[]>('/pages'),
  getPage: (slug: string) => fetchAPI<any>(`/pages/${slug}`),

  // Solutions
  getSolutions: () => fetchAPI<any[]>('/solutions'),
  getSolution: (slug: string) => fetchAPI<any>(`/solutions/${slug}`),
  getCategories: () => fetchAPI<any[]>('/solutions/categories'),

  // Blog
  getBlogPosts: (page = 1) => fetchAPI<any>(`/blog?page=${page}&limit=10`, { revalidate: 600 }),
  getBlogPost: (slug: string) => fetchAPI<any>(`/blog/${slug}`, { revalidate: 3600 }),

  // Careers
  getCareers: () => fetchAPI<any[]>('/careers'),
  getCareer: (id: string) => fetchAPI<any>(`/careers/${id}`),
  applyToCareer: async (id: string, data: FormData) => {
    const response = await fetch(`${API_URL}/careers/${id}/apply`, {
      method: 'POST',
      body: data,
    })
    return response.json()
  },

  // Team
  getTeam: () => fetchAPI<any[]>('/team'),

  // Contact
  submitContact: (data: any) => fetchAPI<any>('/contact', {
    method: 'POST',
    body: data,
    cache: 'no-store',
  }),

  // Settings
  getSettings: () => fetchAPI<any>('/settings'),

  // Accessibility
  getAccessibility: () => fetchAPI<any>('/accessibility'),
}
