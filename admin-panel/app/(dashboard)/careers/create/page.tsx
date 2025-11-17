'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrayInput } from '@/components/array-input'
import { api } from '@/lib/api'

const careerSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  department: z.string().optional(),
  location: z.string().optional(),
  type: z.string().optional(),
  salaryRange: z.string().optional(),
  status: z.enum(['OPEN', 'CLOSED']),
})

type CareerForm = z.infer<typeof careerSchema>

export default function CreateCareerPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [responsibilities, setResponsibilities] = useState<string[]>([])
  const [requirements, setRequirements] = useState<string[]>([])
  const [benefits, setBenefits] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CareerForm>({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      status: 'OPEN',
    },
  })

  const onSubmit = async (data: CareerForm) => {
    setIsLoading(true)

    try {
      const payload = {
        ...data,
        responsibilities,
        requirements,
        benefits,
      }
      await api.post('/careers', payload)
      toast.success('Job posting created successfully')
      router.push('/careers')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create job posting')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create Job Posting</h1>
          <p className="text-muted-foreground">Add a new career opportunity</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="Senior Software Engineer"
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Job description..."
                rows={4}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  {...register('department')}
                  placeholder="Engineering"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  {...register('location')}
                  placeholder="Remote / San Francisco"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Job Type</Label>
                <Input
                  id="type"
                  {...register('type')}
                  placeholder="Full-time"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salaryRange">Salary Range</Label>
                <Input
                  id="salaryRange"
                  {...register('salaryRange')}
                  placeholder="$100,000 - $150,000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select id="status" {...register('status')}>
                <option value="OPEN">Open</option>
                <option value="CLOSED">Closed</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ArrayInput
              value={responsibilities}
              onChange={setResponsibilities}
              placeholder="Add a responsibility"
              label="Responsibilities"
            />

            <ArrayInput
              value={requirements}
              onChange={setRequirements}
              placeholder="Add a requirement"
              label="Requirements"
            />

            <ArrayInput
              value={benefits}
              onChange={setBenefits}
              placeholder="Add a benefit"
              label="Benefits"
            />
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
            {isLoading ? 'Creating...' : 'Create Job Posting'}
          </Button>
        </div>
      </form>
    </div>
  )
}
