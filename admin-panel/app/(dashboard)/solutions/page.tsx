'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTable, Column } from '@/components/data-table'
import { api } from '@/lib/api'
import { Solution, PaginatedResponse } from '@/lib/types'
import { formatDate } from '@/lib/utils'

export default function SolutionsListPage() {
  const router = useRouter()
  const [solutions, setSolutions] = useState<Solution[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchSolutions()
  }, [currentPage, search])

  const fetchSolutions = async () => {
    try {
      setLoading(true)
      const response = await api.get<PaginatedResponse<Solution>>(
        `/solutions?page=${currentPage}&limit=10&search=${search}`
      )
      setSolutions(response.data)
      setTotalPages(response.meta.totalPages)
    } catch (error) {
      toast.error('Failed to fetch solutions')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this solution?')) return

    try {
      await api.delete(`/admin/solutions/${id}`)
      toast.success('Solution deleted successfully')
      fetchSolutions()
    } catch (error) {
      toast.error('Failed to delete solution')
    }
  }

  const columns: Column[] = [
    { key: 'title', label: 'Title' },
    {
      key: 'category',
      label: 'Category',
      render: (value) => value?.name || 'Uncategorized',
    },
    {
      key: 'isPublished',
      label: 'Status',
      render: (value) => (
        <span
          className={`inline-flex px-2 py-1 text-xs rounded-full ${
            value
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
          }`}
        >
          {value ? 'Published' : 'Draft'}
        </span>
      ),
    },
    { key: 'updatedAt', label: 'Updated', render: (value) => formatDate(value) },
    {
      key: 'id',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/solutions/${row.slug}/edit`)}
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
          <h1 className="text-3xl font-bold">Solutions</h1>
          <p className="text-muted-foreground">Manage your solution offerings</p>
        </div>
        <Button onClick={() => router.push('/solutions/create')}>
          <Plus className="mr-2 h-4 w-4" />
          Create Solution
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search solutions..."
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
        data={solutions}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        emptyMessage="No solutions found. Create your first solution!"
      />
    </div>
  )
}
