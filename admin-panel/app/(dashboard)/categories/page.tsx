'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTable, Column } from '@/components/data-table'
import { api } from '@/lib/api'
import { SolutionCategory } from '@/lib/types'
import { formatDate } from '@/lib/utils'

export default function CategoriesListPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<SolutionCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [search])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await api.get<SolutionCategory[]>(`/solutions/categories?search=${search}`)
      const safeCategories = Array.isArray(response) ? response : []
      setCategories(safeCategories)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      toast.error('Failed to fetch categories')
      setCategories([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return

    try {
      await api.delete(`/solutions/categories/${id}`)
      toast.success('Category deleted successfully')
      fetchCategories()
    } catch (error) {
      toast.error('Failed to delete category')
    }
  }

  const columns: Column[] = [
    { key: 'name', label: 'Name' },
    { key: 'slug', label: 'Slug', render: (value) => <span className="text-muted-foreground">{value}</span> },
    { key: 'description', label: 'Description', render: (value) => value || '-' },
    { key: 'sortOrder', label: 'Order' },
    { key: 'updatedAt', label: 'Updated', render: (value) => formatDate(value) },
    {
      key: 'id',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/categories/${row.slug}/edit`)}
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
          <h1 className="text-3xl font-bold">Solution Categories</h1>
          <p className="text-muted-foreground">Manage solution categories</p>
        </div>
        <Button onClick={() => router.push('/categories/create')}>
          <Plus className="mr-2 h-4 w-4" />
          Create Category
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={categories}
        loading={loading}
        emptyMessage="No categories found. Create your first category!"
      />
    </div>
  )
}
