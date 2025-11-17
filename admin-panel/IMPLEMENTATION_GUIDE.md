# 🎯 SOOTHE Admin Panel - Complete Implementation Guide

This guide shows you exactly how to build all remaining CRUD modules following the established patterns.

---

## 📋 Implementation Status

### ✅ **Completed (Core Foundation)**
- [x] Project setup & configuration
- [x] TypeScript types and interfaces
- [x] API client with auto-refresh
- [x] Zustand state management
- [x] Authentication system
- [x] UI components (shadcn/ui)
- [x] Theme provider (dark/light mode)
- [x] Login page

### 🚧 **To Be Implemented (Following the Patterns Below)**

Each module needs 3-4 pages:
1. **List Page** - Table with search, filters, pagination
2. **Create Page** - Form with validation
3. **Edit Page** - Pre-filled form
4. **View Page** (optional) - Detailed view

---

## 🏗️ Architecture Pattern

### File Structure for Each Module

```
app/
└── [module-name]/
    ├── page.tsx              # List view
    ├── create/
    │   └── page.tsx          # Create form
    ├── [id]/
    │   ├── page.tsx          # View detail
    │   └── edit/
    │       └── page.tsx      # Edit form
```

---

## 📝 Step-by-Step Pattern for Each Module

### 1. **Pages Module** Example

#### A. List Page (`app/pages/page.tsx`)

```typescript
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { api } from '@/lib/api'
import { Page, PaginatedResponse } from '@/lib/types'

export default function PagesListPage() {
  const router = useRouter()
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchPages()
  }, [currentPage, search])

  const fetchPages = async () => {
    try {
      setLoading(true)
      const response = await api.get<PaginatedResponse<Page>>(
        `/pages?page=${currentPage}&limit=10&search=${search}`
      )
      setPages(response.data)
      setTotalPages(response.meta.totalPages)
    } catch (error) {
      toast.error('Failed to fetch pages')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return

    try {
      await api.delete(`/admin/pages/${id}`)
      toast.success('Page deleted successfully')
      fetchPages()
    } catch (error) {
      toast.error('Failed to delete page')
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pages</h1>
          <p className="text-muted-foreground">Manage your dynamic pages</p>
        </div>
        <Button onClick={() => router.push('/pages/create')}>
          <Plus className="mr-2 h-4 w-4" />
          Create Page
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Slug</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Updated</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center p-8">
                    Loading...
                  </td>
                </tr>
              ) : pages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-8">
                    No pages found
                  </td>
                </tr>
              ) : (
                pages.map((page) => (
                  <tr key={page.id} className="border-t hover:bg-muted/50">
                    <td className="p-4 font-medium">{page.title}</td>
                    <td className="p-4 text-muted-foreground">{page.slug}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          page.isPublished
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}
                      >
                        {page.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {new Date(page.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => router.push(`/pages/${page.id}/edit`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(page.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center p-4 border-t">
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
```

#### B. Create Page (`app/pages/create/page.tsx`)

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'
import { slugify } from '@/lib/utils'

const pageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  isPublished: z.boolean(),
})

type PageForm = z.infer<typeof pageSchema>

export default function CreatePagePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PageForm>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      isPublished: false,
    },
  })

  // Auto-generate slug from title
  const title = watch('title')
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setValue('title', newTitle)
    setValue('slug', slugify(newTitle))
  }

  const onSubmit = async (data: PageForm) => {
    setIsLoading(true)

    try {
      await api.post('/admin/pages', data)
      toast.success('Page created successfully')
      router.push('/pages')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create page')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create Page</h1>
          <p className="text-muted-foreground">Add a new page to your site</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Page Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                {...register('title')}
                onChange={handleTitleChange}
                placeholder="About Us"
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                {...register('slug')}
                placeholder="about-us"
              />
              {errors.slug && (
                <p className="text-sm text-destructive">{errors.slug.message}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isPublished"
                {...register('isPublished')}
                className="h-4 w-4"
              />
              <Label htmlFor="isPublished">Publish immediately</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                {...register('metaTitle')}
                placeholder="Page meta title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <textarea
                id="metaDescription"
                {...register('metaDescription')}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Page meta description"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Page'}
          </Button>
        </div>
      </form>
    </div>
  )
}
```

---

## 🔄 Replication Steps for Other Modules

### For Each Module, Follow This Pattern:

1. **Copy the list page template** → Adjust API endpoints and data types
2. **Copy the create page template** → Update form fields
3. **Copy for edit page** → Add data fetching to pre-fill form
4. **Update TypeScript types** in `lib/types.ts`
5. **Add navigation** in sidebar

---

## 📋 Module-Specific Requirements

### **Solutions Module**
- Add category dropdown select
- Features/Benefits array input (dynamic fields)
- Image upload for solution image

### **Blog Module**
- Rich text editor (use `react-quill`)
- Tags input (array of strings)
- Featured image upload
- Author auto-assigned from logged-in user

### **Careers Module**
- Responsibilities (array input)
- Requirements (array input)
- Benefits (array input)
- Status toggle (OPEN/CLOSED)

### **Applicants Module**
- **List only** (no create/edit)
- CV download button
- Status update dropdown
- Delete function

### **Team Module**
- Photo upload
- Social links (LinkedIn, Twitter)
- Sort order (drag & drop optional)
- Active/Inactive toggle

### **Media Library**
- Grid view instead of table
- Image preview on hover
- **Required**: Alt text input for accessibility
- File upload with drag & drop

### **Contact Submissions**
- **List only** (no create/edit)
- Mark as read/unread
- View message details in modal
- Delete function

### **Settings Module**
- **Single page** (no list)
- Form with all site settings
- Social media links
- SEO defaults

### **Users Module** (Admin Only)
- Role dropdown (5 roles)
- Active/Inactive toggle
- Password change option
- Role-based access guard

---

## 🎨 Component Examples

### Reusable Table Component

```typescript
// components/data-table.tsx
export function DataTable({ columns, data, loading }) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="text-left p-4">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center p-8">
                  Loading...
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id} className="border-t hover:bg-muted/50">
                  {/* Render cells */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
```

### Delete Confirmation Dialog

```typescript
// components/delete-dialog.tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export function DeleteDialog({ open, onOpenChange, onConfirm, title }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {title}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

---

## 🚀 Quick Implementation Checklist

For each module:

- [ ] Create `app/[module]/page.tsx` (list view)
- [ ] Create `app/[module]/create/page.tsx` (create form)
- [ ] Create `app/[module]/[id]/edit/page.tsx` (edit form)
- [ ] Add TypeScript types to `lib/types.ts`
- [ ] Add API service methods if needed
- [ ] Test CRUD operations
- [ ] Add to navigation menu
- [ ] Test accessibility (keyboard navigation)
- [ ] Test responsive design
- [ ] Add loading states
- [ ] Add error handling

---

## 📖 Additional Features to Add

### 1. Dashboard Home Page
- Stats cards (total pages, posts, etc.)
- Recent activity
- Quick action buttons

### 2. Rich Text Editor
```bash
npm install react-quill
```

### 3. Image Upload
```typescript
const handleUpload = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('altText', 'Image description')
  
  await api.upload('/media/upload', formData)
}
```

### 4. Sidebar Navigation
Create `components/layout/sidebar.tsx` with links to all modules

---

## 🎯 Estimated Time to Complete

- Each basic CRUD module: **2-3 hours**
- Complex modules (blog, media): **4-6 hours**
- Dashboard home: **2-3 hours**
- Navigation & layout: **3-4 hours**
- Testing & refinement: **4-6 hours**

**Total: ~40-50 hours** for complete implementation

---

## 🆘 Getting Help

1. Check `README.md` for setup instructions
2. Review `lib/types.ts` for data structures
3. See `lib/api.ts` for API methods
4. Refer to backend `README.md` for API docs
5. Check Swagger docs: `http://localhost:3000/api/docs`

---

**This guide provides all patterns needed to complete the admin panel. Each module follows the same structure, making implementation systematic and consistent.**
