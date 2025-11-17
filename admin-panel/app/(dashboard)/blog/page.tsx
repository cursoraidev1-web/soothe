'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTable, Column } from '@/components/data-table'
import { api } from '@/lib/api'
import { BlogPost, PaginatedResponse } from '@/lib/types'
import { formatDate } from '@/lib/utils'

export default function BlogListPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchPosts()
  }, [currentPage, search])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await api.get<PaginatedResponse<BlogPost>>(
        `/blog?page=${currentPage}&limit=10&search=${search}`
      )
      setPosts(response.data)
      setTotalPages(response.meta.totalPages)
    } catch (error) {
      toast.error('Failed to fetch blog posts')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      await api.delete(`/admin/blog/${id}`)
      toast.success('Post deleted successfully')
      fetchPosts()
    } catch (error) {
      toast.error('Failed to delete post')
    }
  }

  const columns: Column[] = [
    { key: 'title', label: 'Title' },
    { 
      key: 'author', 
      label: 'Author',
      render: (value) => value ? `${value.firstName} ${value.lastName}` : 'Unknown'
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span
          className={`inline-flex px-2 py-1 text-xs rounded-full ${
            value === 'PUBLISHED'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
          }`}
        >
          {value}
        </span>
      ),
    },
    { key: 'readingTime', label: 'Read Time', render: (value) => `${value} min` },
    { key: 'createdAt', label: 'Created', render: (value) => formatDate(value) },
    {
      key: 'id',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/blog/${row.slug}/edit`)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(row.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
        <Button onClick={() => router.push('/blog/create')}>
          <Plus className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-9"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={posts}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        emptyMessage="No blog posts found. Create your first post!"
      />
    </div>
  )
}
