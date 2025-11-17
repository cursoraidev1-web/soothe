'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Search, Eye, Trash2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTable, Column } from '@/components/data-table'
import { api } from '@/lib/api'
import type { Applicant, PaginatedResponse } from '@/lib/types'
import { formatDate } from '@/lib/utils'

export default function ApplicantsListPage() {
  const router = useRouter()
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchApplicants()
  }, [currentPage, search])

  const fetchApplicants = async () => {
    try {
      setLoading(true)
      const response = await api.get<PaginatedResponse<Applicant>>(
        `/admin/applicants?page=${currentPage}&limit=10&search=${search}`
      )
      setApplicants(response.data)
      setTotalPages(response.meta.totalPages)
    } catch (error) {
      toast.error('Failed to fetch applicants')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return

    try {
      await api.delete(`/admin/applicants/${id}`)
      toast.success('Application deleted successfully')
      fetchApplicants()
    } catch (error) {
      toast.error('Failed to delete application')
    }
  }

  const handleDownloadCV = (cvPath: string, applicantName: string) => {
    // Assuming CV path is relative to backend uploads
    const cvUrl = cvPath.startsWith('http') ? cvPath : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '')}${cvPath}`
    window.open(cvUrl, '_blank')
  }

  const columns: Column[] = [
    {
      key: 'firstName',
      label: 'Name',
      render: (_, row) => `${row.firstName} ${row.lastName}`,
    },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone', render: (value) => value || '-' },
    {
      key: 'career',
      label: 'Position',
      render: (value) => value?.title || 'N/A',
    },
    { key: 'createdAt', label: 'Applied', render: (value) => formatDate(value) },
    {
      key: 'id',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          {row.cvPath && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDownloadCV(row.cvPath, `${row.firstName} ${row.lastName}`)}
              title="Download CV"
            >
              <Download className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/applicants/${row.id}`)}
            title="View Details"
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
          <h1 className="text-3xl font-bold">Job Applicants</h1>
          <p className="text-muted-foreground">View and manage job applications</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applicants..."
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
        data={applicants}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        emptyMessage="No applications received yet."
      />
    </div>
  )
}
