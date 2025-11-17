const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1'

interface FetchOptions {
  method?: string
  body?: any
  cache?: RequestCache
  revalidate?: number
}

async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { method = 'GET', body, cache = 'no-store', revalidate } = options

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    cache,
    ...(revalidate && { next: { revalidate } }),
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const fullUrl = `${API_URL}${endpoint}`
  
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
  getPages: () => fetchAPI<any[]>('/pages', { revalidate: 3600 }),
  getPage: (slug: string) => fetchAPI<any>(`/pages/${slug}`, { revalidate: 3600 }),

  // Solutions
  getSolutions: () => fetchAPI<any[]>('/solutions', { revalidate: 3600 }),
  getSolution: (slug: string) => fetchAPI<any>(`/solutions/${slug}`, { revalidate: 3600 }),
  getCategories: () => fetchAPI<any[]>('/solutions/categories', { revalidate: 3600 }),

  // Blog
  getBlogPosts: (page = 1) => fetchAPI<any>(`/blog?page=${page}&limit=10`, { revalidate: 600 }),
  getBlogPost: (slug: string) => fetchAPI<any>(`/blog/${slug}`, { revalidate: 3600 }),

  // Careers
  getCareers: () => fetchAPI<any[]>('/careers', { revalidate: 3600 }),
  getCareer: (id: string) => fetchAPI<any>(`/careers/${id}`, { revalidate: 3600 }),
  applyToCareer: async (id: string, data: FormData) => {
    const response = await fetch(`${API_URL}/careers/${id}/apply`, {
      method: 'POST',
      body: data,
    })
    return response.json()
  },

  // Team
  getTeam: () => fetchAPI<any[]>('/team', { revalidate: 3600 }),

  // Contact
  submitContact: (data: any) => fetchAPI<any>('/contact', {
    method: 'POST',
    body: data,
    cache: 'no-store',
  }),

  // Settings
  getSettings: () => fetchAPI<any>('/settings', { revalidate: 3600 }),

  // Accessibility
  getAccessibility: () => fetchAPI<any>('/accessibility', { revalidate: 3600 }),
}
