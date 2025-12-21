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
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileUpload } from '@/components/file-upload'
import { ArrayInput } from '@/components/array-input'
import { api } from '@/lib/api'
import type { Solution, SolutionCategory } from '@/lib/types'

const solutionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  categoryId: z.string().min(1, 'Category is required'),
  imageUrl: z.string().optional(),
  isPublished: z.boolean(),
  sortOrder: z.number(),
})

type SolutionForm = z.infer<typeof solutionSchema>

export default function EditSolutionPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug as string
  const [solutionId, setSolutionId] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<SolutionCategory[]>([])
  const [features, setFeatures] = useState<string[]>([])
  const [benefits, setBenefits] = useState<string[]>([])
  const [imageUrl, setImageUrl] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SolutionForm>({
    resolver: zodResolver(solutionSchema),
  })

  useEffect(() => {
    if (slug) {
      fetchCategories()
      fetchSolution()
    }
  }, [slug])

  const fetchCategories = async () => {
    try {
      const response = await api.get<SolutionCategory[]>('/solutions/categories')
      const safeCategories = Array.isArray(response) ? response : []
      setCategories(safeCategories)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      toast.error('Failed to fetch categories')
      setCategories([])
    }
  }

  const fetchSolution = async () => {
    try {
      setLoading(true)
      const solution = await api.get<Solution>(`/solutions/${slug}`)
      setSolutionId(solution.id)
      reset({
        title: solution.title,
        slug: solution.slug,
        description: solution.description,
        categoryId: solution.categoryId,
        imageUrl: solution.imageUrl || '',
        isPublished: solution.isPublished,
        sortOrder: solution.sortOrder || 0,
      })
      setImageUrl(solution.imageUrl || '')
      setFeatures(solution.features || [])
      setBenefits(solution.benefits || [])
    } catch (error) {
      toast.error('Failed to fetch solution')
      router.push('/solutions')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: SolutionForm) => {
    setIsLoading(true)

    try {
      const payload = {
        ...data,
        imageUrl: imageUrl || undefined,
        features,
        benefits,
      }
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/app/(dashboard)/solutions/[slug]/edit/page.tsx:108',message:'Update Solution Start',data:{solutionId,title:data.title},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
      // #endregion
      await api.put(`/admin/solutions/${solutionId}`, payload)
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/app/(dashboard)/solutions/[slug]/edit/page.tsx:110',message:'Update Solution Success',data:{solutionId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
      // #endregion
      toast.success('Solution updated successfully')
      router.push('/solutions')
    } catch (error: any) {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/app/(dashboard)/solutions/[slug]/edit/page.tsx:114',message:'Update Solution Error',data:{status:error.response?.status,message:error.response?.data?.message||error.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
      // #endregion
      toast.error(error.response?.data?.message || 'Failed to update solution')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this solution?')) return
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/app/(dashboard)/solutions/[slug]/edit/page.tsx:118',message:'Delete Solution Start',data:{solutionId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
    // #endregion

    try {
      await api.delete(`/admin/solutions/${solutionId}`)
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/app/(dashboard)/solutions/[slug]/edit/page.tsx:122',message:'Delete Solution Success',data:{solutionId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
      // #endregion
      toast.success('Solution deleted successfully')
      router.push('/solutions')
    } catch (error: any) {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/app/(dashboard)/solutions/[slug]/edit/page.tsx:126',message:'Delete Solution Error',data:{status:error.response?.status,message:error.response?.data?.message||error.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
      // #endregion
      toast.error('Failed to delete solution')
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
            <h1 className="text-3xl font-bold">Edit Solution</h1>
            <p className="text-muted-foreground">Update solution information</p>
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
            <CardTitle>Solution Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" {...register('title')} />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input id="slug" {...register('slug')} />
              {errors.slug && (
                <p className="text-sm text-destructive">{errors.slug.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" {...register('description')} rows={4} />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryId">Category *</Label>
              <Select id="categoryId" {...register('categoryId')}>
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Select>
              {errors.categoryId && (
                <p className="text-sm text-destructive">{errors.categoryId.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sortOrder">Sort Order</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  {...register('sortOrder', { valueAsNumber: true })}
                />
              </div>

              <div className="flex items-center space-x-2 pt-8">
                <input
                  type="checkbox"
                  id="isPublished"
                  {...register('isPublished')}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="isPublished">Published</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Image</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUpload value={imageUrl} onChange={setImageUrl} label="Solution Image" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features & Benefits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ArrayInput
              value={features}
              onChange={setFeatures}
              placeholder="Add a feature"
              label="Features"
            />

            <ArrayInput
              value={benefits}
              onChange={setBenefits}
              placeholder="Add a benefit"
              label="Benefits"
            />
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
