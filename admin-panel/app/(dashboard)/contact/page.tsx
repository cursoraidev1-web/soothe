'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Search, Eye, Trash2, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTable, Column } from '@/components/data-table'
import { api } from '@/lib/api'
import type { ContactSubmission, PaginatedResponse } from '@/lib/types'
import { formatDate } from '@/lib/utils'

export default function ContactSubmissionsPage() {
  const router = useRouter()
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchSubmissions()
  }, [currentPage, search])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const response = await api.get<PaginatedResponse<ContactSubmission>>(
        `/admin/contact-submissions?page=${currentPage}&limit=10&search=${search}`
      )
      setSubmissions(response.data)
      setTotalPages(response.meta.totalPages)
    } catch (error) {
      toast.error('Failed to fetch contact submissions')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return

    try {
      await api.delete(`/admin/contact-submissions/${id}`)
      toast.success('Submission deleted successfully')
      fetchSubmissions()
    } catch (error) {
      toast.error('Failed to delete submission')
    }
  }

  const columns: Column[] = [
    { key: 'name', label: 'Name' },
    { 
      key: 'email', 
      label: 'Email',
      render: (value) => (
        <a href={`mailto:${value}`} className="text-blue-600 hover:underline">
          {value}
        </a>
      )
    },
    { key: 'subject', label: 'Subject', render: (value) => value || '-' },
    { 
      key: 'message', 
      label: 'Message',
      render: (value) => (
        <span className="line-clamp-2">{value}</span>
      )
    },
    { key: 'createdAt', label: 'Received', render: (value) => formatDate(value) },
    {
      key: 'id',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.open(`mailto:${row.email}`)}
            title="Reply via Email"
          >
            <Mail className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              alert(`From: ${row.name} (${row.email})\nSubject: ${row.subject || 'No subject'}\n\n${row.message}`)
            }}
            title="View Full Message"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(row.id)}
            title="Delete"
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
          <h1 className="text-3xl font-bold">Contact Submissions</h1>
          <p className="text-muted-foreground">View and manage contact form submissions</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search submissions..."
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
        data={submissions}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        emptyMessage="No contact submissions yet."
      />
    </div>
  )
}
