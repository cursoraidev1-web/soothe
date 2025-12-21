'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTable, Column } from '@/components/data-table'
import { api } from '@/lib/api'
import { Page, PaginatedResponse } from '@/lib/types'
import { formatDate } from '@/lib/utils'

export default function PagesListPage() {
  const router = useRouter()
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchPages()
  }, [currentPage, search])

  const fetchPages = async () => {
    try {
      setLoading(true)
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/app/(dashboard)/pages/page.tsx:26',message:'Fetch Pages Start',data:{page:currentPage,search},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B,C'})}).catch(()=>{});
      // #endregion
      const response = await api.get<PaginatedResponse<Page>>(
        `/pages?page=${currentPage}&limit=10&search=${search}`
      )
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/app/(dashboard)/pages/page.tsx:32',message:'Fetch Pages Response',data:{hasData:!!response.data,hasMeta:!!response.meta,dataIsArray:Array.isArray(response.data),dataLength:Array.isArray(response.data)?response.data.length:'N/A',totalPages:response.meta?.totalPages},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      setPages(response.data)
      setTotalPages(response.meta.totalPages)
    } catch (error: any) {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'admin-panel/app/(dashboard)/pages/page.tsx:36',message:'Fetch Pages Error',data:{status:error.response?.status,message:error.response?.data?.message||error.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
      toast.error('Failed to fetch pages')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return

    try {
      await api.delete(`/admin/pages/${id}`)
      toast.success('Page deleted successfully')
      fetchPages()
    } catch (error) {
      toast.error('Failed to delete page')
    }
  }

  const columns: Column[] = [
    { key: 'title', label: 'Title' },
    { key: 'slug', label: 'Slug', render: (value) => <span className="text-muted-foreground">{value}</span> },
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
            onClick={() => router.push(`/pages/${row.slug}/edit`)}
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
          <h1 className="text-3xl font-bold">Pages</h1>
          <p className="text-muted-foreground">Manage your dynamic pages</p>
        </div>
        <Button onClick={() => router.push('/pages/create')}>
          <Plus className="mr-2 h-4 w-4" />
          Create Page
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pages..."
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
        data={pages}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        emptyMessage="No pages found. Create your first page!"
      />
    </div>
  )
}
