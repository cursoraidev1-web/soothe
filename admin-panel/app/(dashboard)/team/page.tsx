'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataTable, Column } from '@/components/data-table'
import { api } from '@/lib/api'
import type { TeamMember } from '@/lib/types'

export default function TeamListPage() {
  const router = useRouter()
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      setLoading(true)
      const response = await api.get<TeamMember[]>('/team')
      setMembers(response)
    } catch (error) {
      toast.error('Failed to fetch team members')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return

    try {
      await api.delete(`/team/${id}`)
      toast.success('Team member deleted successfully')
      fetchMembers()
    } catch (error) {
      toast.error('Failed to delete team member')
    }
  }

  const columns: Column[] = [
    {
      key: 'photoUrl',
      label: 'Photo',
      render: (value) => (
        value ? (
          <img src={value} alt="Team member" className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xs text-gray-500">No photo</span>
          </div>
        )
      ),
    },
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'email', label: 'Email', render: (value) => value || '-' },
    { key: 'sortOrder', label: 'Order' },
    {
      key: 'id',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/team/${row.id}/edit`)}
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
          <h1 className="text-3xl font-bold">Team Members</h1>
          <p className="text-muted-foreground">Manage your team</p>
        </div>
        <Button onClick={() => router.push('/team/create')}>
          <Plus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={members}
        loading={loading}
        emptyMessage="No team members found. Add your first team member!"
      />
    </div>
  )
}
