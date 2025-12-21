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
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'
import { slugify } from '@/lib/utils'

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  icon: z.string().optional(),
  sortOrder: z.number().default(0),
})

type CategoryForm = z.infer<typeof categorySchema>

export default function CreateCategoryPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      sortOrder: 0,
    },
  })

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setValue('name', newName)
    setValue('slug', slugify(newName))
  }

  const onSubmit = async (data: CategoryForm) => {
    setIsLoading(true)
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/app/(dashboard)/categories/create/page.tsx:51',message:'Create Category Start',data:{name:data.name,slug:data.slug},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
    // #endregion

    try {
      await api.post('/solutions/categories', data)
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/app/(dashboard)/categories/create/page.tsx:55',message:'Create Category Success',data:{name:data.name},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
      // #endregion
      toast.success('Category created successfully')
      router.push('/categories')
    } catch (error: any) {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/app/(dashboard)/categories/create/page.tsx:59',message:'Create Category Error',data:{status:error.response?.status,message:error.response?.data?.message||error.message,errors:error.response?.data?.errors},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
      // #endregion
      toast.error(error.response?.data?.message || 'Failed to create category')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create Category</h1>
          <p className="text-muted-foreground">Add a new solution category</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Category Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                {...register('name')}
                onChange={handleNameChange}
                placeholder="Cloud Solutions"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input id="slug" {...register('slug')} placeholder="cloud-solutions" />
              {errors.slug && (
                <p className="text-sm text-destructive">{errors.slug.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Category description..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon (emoji or class name)</Label>
              <Input
                id="icon"
                {...register('icon')}
                placeholder="☁️ or lucide-cloud"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sortOrder">Sort Order</Label>
              <Input
                id="sortOrder"
                type="number"
                {...register('sortOrder', { valueAsNumber: true })}
                placeholder="0"
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
            {isLoading ? 'Creating...' : 'Create Category'}
          </Button>
        </div>
      </form>
    </div>
  )
}
