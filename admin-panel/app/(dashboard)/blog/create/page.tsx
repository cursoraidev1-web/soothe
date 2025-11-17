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
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileUpload } from '@/components/file-upload'
import { ArrayInput } from '@/components/array-input'
import { RichTextEditor } from '@/components/rich-text-editor'
import { api } from '@/lib/api'
import { slugify } from '@/lib/utils'

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  featuredImage: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']),
})

type BlogForm = z.infer<typeof blogSchema>

export default function CreateBlogPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [featuredImage, setFeaturedImage] = useState('')
  const [content, setContent] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogForm>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      status: 'DRAFT',
    },
  })

  const title = watch('title')
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setValue('title', newTitle)
    setValue('slug', slugify(newTitle))
  }

  const onSubmit = async (data: BlogForm) => {
    setIsLoading(true)

    try {
      // Convert content string to proper format
      let contentToSend: any = content
      
      // If content looks like JSON, parse it
      if (content && content.trim().startsWith('{')) {
        try {
          contentToSend = JSON.parse(content)
        } catch (e) {
          // If parsing fails, create a simple JSON structure
          contentToSend = {
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: content }]
              }
            ]
          }
        }
      } else if (content) {
        // Create proper JSON structure for plain text
        contentToSend = {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: content }]
            }
          ]
        }
      }
      
      const payload = {
        ...data,
        featuredImage: featuredImage || undefined,
        tags,
        content: contentToSend,
      }
      await api.post('/admin/blog', payload)
      toast.success('Post created successfully')
      router.push('/blog')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create post')
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
          <h1 className="text-3xl font-bold">Create Blog Post</h1>
          <p className="text-muted-foreground">Write a new blog post</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Post Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                {...register('title')}
                onChange={handleTitleChange}
                placeholder="How to Build Better Software"
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input id="slug" {...register('slug')} placeholder="how-to-build-better-software" />
              {errors.slug && (
                <p className="text-sm text-destructive">{errors.slug.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                {...register('excerpt')}
                placeholder="Brief description of the post..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select id="status" {...register('status')}>
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Featured Image</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUpload
              value={featuredImage}
              onChange={setFeaturedImage}
              label="Upload Image"
              accept="image/*"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content *</CardTitle>
          </CardHeader>
          <CardContent>
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Write your blog post content here..."
            />
            {errors.content && (
              <p className="text-sm text-destructive mt-2">{errors.content.message}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <ArrayInput
              value={tags}
              onChange={setTags}
              placeholder="Add a tag"
              label="Post Tags"
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
            {isLoading ? 'Creating...' : 'Create Post'}
          </Button>
        </div>
      </form>
    </div>
  )
}
