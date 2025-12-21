'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'
import { Page } from '@/lib/types'

const pageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  isPublished: z.boolean(),
})

type PageForm = z.infer<typeof pageSchema>

export default function EditPagePage() {
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug as string
  const [pageId, setPageId] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PageForm>({
    resolver: zodResolver(pageSchema),
  })

  useEffect(() => {
    if (slug) {
      fetchPage()
    }
  }, [slug])

  const fetchPage = async () => {
    try {
      setLoading(true)
      const page = await api.get<Page>(`/pages/${slug}`)
      setPageId(page.id)
      reset({
        title: page.title,
        slug: page.slug,
        metaTitle: page.metaTitle || '',
        metaDescription: page.metaDescription || '',
        isPublished: page.isPublished,
      })
    } catch (error) {
      toast.error('Failed to fetch page')
      router.push('/pages')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: PageForm) => {
    setIsLoading(true)
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/app/(dashboard)/pages/[slug]/edit/page.tsx:71',message:'Update Page Start',data:{pageId,title:data.title},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
    // #endregion

    try {
      await api.put(`/admin/pages/${pageId}`, data)
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/app/(dashboard)/pages/[slug]/edit/page.tsx:75',message:'Update Page Success',data:{pageId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
      // #endregion
      toast.success('Page updated successfully')
      router.push('/pages')
    } catch (error: any) {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/app/(dashboard)/pages/[slug]/edit/page.tsx:79',message:'Update Page Error',data:{status:error.response?.status,message:error.response?.data?.message||error.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
      // #endregion
      toast.error(error.response?.data?.message || 'Failed to update page')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this page?')) return
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/app/(dashboard)/pages/[slug]/edit/page.tsx:85',message:'Delete Page Start',data:{pageId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
    // #endregion

    try {
      await api.delete(`/admin/pages/${pageId}`)
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/app/(dashboard)/pages/[slug]/edit/page.tsx:89',message:'Delete Page Success',data:{pageId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
      // #endregion
      toast.success('Page deleted successfully')
      router.push('/pages')
    } catch (error: any) {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/app/(dashboard)/pages/[slug]/edit/page.tsx:93',message:'Delete Page Error',data:{status:error.response?.status,message:error.response?.data?.message||error.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
      // #endregion
      toast.error('Failed to delete page')
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Edit Page</h1>
            <p className="text-muted-foreground">Update page information</p>
          </div>
        </div>
        <Button variant="destructive" onClick={handleDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Page Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" {...register('title')} placeholder="About Us" />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input id="slug" {...register('slug')} placeholder="about-us" />
              {errors.slug && (
                <p className="text-sm text-destructive">{errors.slug.message}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isPublished"
                {...register('isPublished')}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="isPublished">Published</Label>
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
              <Textarea
                id="metaDescription"
                {...register('metaDescription')}
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
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  )
}
