'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTable, Column } from '@/components/data-table'
import { api } from '@/lib/api'
import { Career } from '@/lib/types'
import { formatDate } from '@/lib/utils'

export default function CareersListPage() {
  const router = useRouter()
  const [careers, setCareers] = useState<Career[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchCareers()
  }, [search])

  const fetchCareers = async () => {
    try {
      setLoading(true)
      const response = await api.get<Career[]>(`/careers?search=${search}`)
      setCareers(response)
    } catch (error) {
      toast.error('Failed to fetch careers')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job posting?')) return

    try {
      await api.delete(`/careers/${id}`)
      toast.success('Job posting deleted successfully')
      fetchCareers()
    } catch (error) {
      toast.error('Failed to delete job posting')
    }
  }

  const columns: Column[] = [
    { key: 'title', label: 'Title' },
    { key: 'department', label: 'Department', render: (value) => value || '-' },
    { key: 'location', label: 'Location', render: (value) => value || '-' },
    { key: 'type', label: 'Type', render: (value) => value || '-' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span
          className={`inline-flex px-2 py-1 text-xs rounded-full ${
            value === 'OPEN'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}
        >
          {value}
        </span>
      ),
    },
    { key: 'createdAt', label: 'Created', render: (value) => formatDate(value) },
    {
      key: 'id',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/careers/${row.id}/edit`)}
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
          <h1 className="text-3xl font-bold">Careers</h1>
          <p className="text-muted-foreground">Manage job postings</p>
        </div>
        <Button onClick={() => router.push('/careers/create')}>
          <Plus className="mr-2 h-4 w-4" />
          Create Job Posting
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={careers}
        loading={loading}
        emptyMessage="No job postings found. Create your first posting!"
      />
    </div>
  )
}
