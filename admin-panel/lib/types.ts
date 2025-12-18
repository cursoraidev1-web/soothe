// User types
export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'AUTHOR' | 'VIEWER'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface LoginResponse {
  message: string
  user: User
  accessToken: string
  refreshToken: string
}

// Page types
export interface Page {
  id: string
  title: string
  slug: string
  content?: any
  metaTitle?: string
  metaDescription?: string
  ogImage?: string
  isPublished: boolean
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

// Solution types
export interface SolutionCategory {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface Solution {
  id: string
  title: string
  slug: string
  description: string
  longDescription?: string
  icon?: string
  imageUrl?: string
  features?: string[]
  benefits?: string[]
  metaTitle?: string
  metaDescription?: string
  ogImage?: string
  isPublished: boolean
  publishedAt?: string
  categoryId?: string
  category?: SolutionCategory
  sortOrder: number
  createdAt: string
  updatedAt: string
}

// Blog types
export type PostStatus = 'DRAFT' | 'PUBLISHED'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: any
  featuredImage?: string
  authorId: string
  author: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
  tags?: string[]
  readingTime?: number
  metaTitle?: string
  metaDescription?: string
  ogImage?: string
  status: PostStatus
  publishedAt?: string
  viewCount: number
  createdAt: string
  updatedAt: string
}

// Career types
export type JobStatus = 'OPEN' | 'CLOSED'

export interface Career {
  id: string
  title: string
  department?: string
  location?: string
  type?: string
  description: string
  responsibilities?: string[]
  requirements?: string[]
  benefits?: string[]
  status: JobStatus
  salaryMin?: number
  salaryMax?: number
  salaryCurrency?: string
  salaryRange?: string
  metaTitle?: string
  metaDescription?: string
  createdAt: string
  updatedAt: string
}

export interface Applicant {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  message?: string
  cvUrl?: string
  cvPath?: string
  linkedinUrl?: string
  coverLetter?: string
  careerId: string
  career: {
    id: string
    title: string
    department?: string
  }
  status: string
  notes?: string
  createdAt: string
  updatedAt: string
}

// Team types
export interface TeamMember {
  id: string
  name?: string
  firstName: string
  lastName: string
  role: string
  bio?: string
  photoUrl?: string
  linkedinUrl?: string
  twitterUrl?: string
  email?: string
  sortOrder: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Contact types
export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  isRead: boolean
  notes?: string
  createdAt: string
  updatedAt: string
}

// Media types
export interface Media {
  id: string
  fileName: string
  originalName: string
  mimeType: string
  size: number
  url: string
  altText?: string
  title?: string
  description?: string
  width?: number
  height?: number
  folder?: string
  createdAt: string
  updatedAt: string
}

// Settings types
export interface Settings {
  id: string
  siteName: string
  siteDescription?: string
  siteUrl?: string
  logoUrl?: string
  faviconUrl?: string
  defaultMetaTitle?: string
  defaultMetaDescription?: string
  defaultOgImage?: string
  accessibilityEnabled: boolean
  defaultFontSize: number
  defaultContrast: string
  facebookUrl?: string
  twitterUrl?: string
  linkedinUrl?: string
  instagramUrl?: string
  contactEmail?: string
  contactPhone?: string
  createdAt: string
  updatedAt: string
}

// Accessibility types
export interface Accessibility {
  id: string
  statement?: string
  wcagLevel: string
  guidelines?: any
  keyboardNavigation: boolean
  screenReaderSupport: boolean
  highContrastMode: boolean
  textResizing: boolean
  altTextRequired: boolean
  lastAuditDate?: string
  nextAuditDate?: string
  createdAt: string
  updatedAt: string
}

// Pagination types
export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

// API Error types
export interface ApiError {
  message: string
  statusCode: number
  error?: string
}
