'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { toast } from 'sonner'
import { ArrowLeft, Download, Trash2, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'
import type { Applicant } from '@/lib/types'
import { formatDate } from '@/lib/utils'

export default function ApplicantDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const [applicant, setApplicant] = useState<Applicant | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchApplicant()
    }
  }, [id])

  const fetchApplicant = async () => {
    try {
      setLoading(true)
      const data = await api.get<Applicant>(`/admin/applicants/${id}`)
      setApplicant(data)
    } catch (error) {
      toast.error('Failed to fetch applicant details')
      router.push('/applicants')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this application?')) return

    try {
      await api.delete(`/admin/applicants/${id}`)
      toast.success('Application deleted successfully')
      router.push('/applicants')
    } catch (error) {
      toast.error('Failed to delete application')
    }
  }

  const handleDownloadCV = () => {
    if (applicant?.cvPath) {
      const cvUrl = applicant.cvPath.startsWith('http') 
        ? applicant.cvPath 
        : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '')}${applicant.cvPath}`
      window.open(cvUrl, '_blank')
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>
  }

  if (!applicant) {
    return <div className="flex items-center justify-center h-96">Applicant not found</div>
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {applicant.firstName} {applicant.lastName}
            </h1>
            <p className="text-muted-foreground">
              Applied for: {applicant.career?.title || 'N/A'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {applicant.cvPath && (
            <Button onClick={handleDownloadCV}>
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </Button>
          )}
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${applicant.email}`} className="text-blue-600 hover:underline">
                {applicant.email}
              </a>
            </div>
            {applicant.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${applicant.phone}`} className="text-blue-600 hover:underline">
                  {applicant.phone}
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Position</p>
              <p className="text-sm">{applicant.career?.title || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Applied On</p>
              <p className="text-sm">{formatDate(applicant.createdAt)}</p>
            </div>
            {applicant.cvPath && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">CV</p>
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={handleDownloadCV}
                >
                  Download Resume/CV
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {applicant.coverLetter && (
        <Card>
          <CardHeader>
            <CardTitle>Cover Letter</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-sm">{applicant.coverLetter}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
