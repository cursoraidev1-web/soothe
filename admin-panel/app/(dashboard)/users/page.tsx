'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Plus, Search, Edit, Trash2, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTable, Column } from '@/components/data-table'
import { api } from '@/lib/api'
import { User, PaginatedResponse, UserRole } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { useAuthStore } from '@/lib/store'

export default function UsersListPage() {
  const router = useRouter()
  const currentUser = useAuthStore((state) => state.user)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    // Check if user has permission
    if (currentUser?.role !== 'SUPER_ADMIN' && currentUser?.role !== 'ADMIN') {
      toast.error('You do not have permission to access this page')
      router.push('/dashboard')
      return
    }
    fetchUsers()
  }, [currentPage, search, currentUser, router])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await api.get<PaginatedResponse<User>>(
        `/admin/users?page=${currentPage}&limit=10&search=${search}`
      )
      setUsers(response.data)
      setTotalPages(response.meta.totalPages)
    } catch (error) {
      toast.error('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (id === currentUser?.id) {
      toast.error('You cannot delete your own account')
      return
    }

    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      await api.delete(`/admin/users/${id}`)
      toast.success('User deleted successfully')
      fetchUsers()
    } catch (error) {
      toast.error('Failed to delete user')
    }
  }

  const getRoleBadgeColor = (role: UserRole) => {
    const colors = {
      SUPER_ADMIN: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      ADMIN: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      EDITOR: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      AUTHOR: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      VIEWER: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    }
    return colors[role] || colors.VIEWER
  }

  const columns: Column[] = [
    {
      key: 'firstName',
      label: 'Name',
      render: (_, row) => `${row.firstName} ${row.lastName}`,
    },
    { key: 'email', label: 'Email' },
    {
      key: 'role',
      label: 'Role',
      render: (value) => (
        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getRoleBadgeColor(value)}`}>
          <Shield className="h-3 w-3" />
          {value.replace('_', ' ')}
        </span>
      ),
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (value) => (
        <span
          className={`inline-flex px-2 py-1 text-xs rounded-full ${
            value
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}
        >
          {value ? 'Active' : 'Inactive'}
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
            onClick={() => router.push(`/users/${row.id}/edit`)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(row.id)}
            disabled={row.id === currentUser?.id}
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
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <Button onClick={() => router.push('/users/create')}>
          <Plus className="mr-2 h-4 w-4" />
          Create User
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
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
        data={users}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        emptyMessage="No users found."
      />
    </div>
  )
}
