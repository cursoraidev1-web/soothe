'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileUpload } from '@/components/file-upload'
import { api } from '@/lib/api'
import type { TeamMember } from '@/lib/types'

const teamSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  bio: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  twitterUrl: z.string().url().optional().or(z.literal('')),
  sortOrder: z.number(),
})

type TeamForm = z.infer<typeof teamSchema>

export default function EditTeamMemberPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [photoUrl, setPhotoUrl] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeamForm>({
    resolver: zodResolver(teamSchema),
  })

  useEffect(() => {
    if (id) {
      fetchMember()
    }
  }, [id])

  const fetchMember = async () => {
    try {
      setLoading(true)
      const member = await api.get<TeamMember>(`/team/${id}`)
      reset({
        name: member.name,
        role: member.role,
        bio: member.bio || '',
        email: member.email || '',
        linkedinUrl: member.linkedinUrl || '',
        twitterUrl: member.twitterUrl || '',
        sortOrder: member.sortOrder || 0,
      })
      setPhotoUrl(member.photoUrl || '')
    } catch (error) {
      toast.error('Failed to fetch team member')
      router.push('/team')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: TeamForm) => {
    setIsLoading(true)

    try {
      const payload = {
        ...data,
        photoUrl: photoUrl || undefined,
      }
      await api.put(`/team/${id}`, payload)
      toast.success('Team member updated successfully')
      router.push('/team')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update team member')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this team member?')) return

    try {
      await api.delete(`/team/${id}`)
      toast.success('Team member deleted successfully')
      router.push('/team')
    } catch (error) {
      toast.error('Failed to delete team member')
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Edit Team Member</h1>
            <p className="text-muted-foreground">Update member information</p>
          </div>
        </div>
        <Button variant="destructive" onClick={handleDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Member Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input id="name" {...register('name')} />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Input id="role" {...register('role')} />
              {errors.role && (
                <p className="text-sm text-destructive">{errors.role.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" {...register('bio')} rows={4} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sortOrder">Sort Order</Label>
              <Input
                id="sortOrder"
                type="number"
                {...register('sortOrder', { valueAsNumber: true })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUpload value={photoUrl} onChange={setPhotoUrl} label="Team Member Photo" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
              <Input id="linkedinUrl" {...register('linkedinUrl')} />
              {errors.linkedinUrl && (
                <p className="text-sm text-destructive">{errors.linkedinUrl.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitterUrl">Twitter URL</Label>
              <Input id="twitterUrl" {...register('twitterUrl')} />
              {errors.twitterUrl && (
                <p className="text-sm text-destructive">{errors.twitterUrl.message}</p>
              )}
            </div>
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
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  )
}
