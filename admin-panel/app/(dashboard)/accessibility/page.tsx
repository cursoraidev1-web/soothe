'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'
import type { Accessibility } from '@/lib/types'

const accessibilitySchema = z.object({
  statement: z.string().optional(),
  wcagLevel: z.string().optional(),
  enableHighContrast: z.boolean(),
  enableScreenReader: z.boolean(),
  enableKeyboardNav: z.boolean(),
})

type AccessibilityForm = z.infer<typeof accessibilitySchema>

export default function AccessibilityPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccessibilityForm>({
    resolver: zodResolver(accessibilitySchema),
  })

  useEffect(() => {
    fetchAccessibility()
  }, [])

  const fetchAccessibility = async () => {
    try {
      setLoading(true)
      const data = await api.get<Accessibility>('/accessibility')
      reset({
        statement: data.statement || '',
        wcagLevel: data.wcagLevel || 'AA',
        enableHighContrast: data.enableHighContrast || false,
        enableScreenReader: data.enableScreenReader || false,
        enableKeyboardNav: data.enableKeyboardNav || false,
      })
    } catch (error) {
      toast.error('Failed to fetch accessibility settings')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: AccessibilityForm) => {
    setIsLoading(true)

    try {
      await api.put('/accessibility', data)
      toast.success('Accessibility settings updated successfully')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update settings')
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Accessibility Settings</h1>
        <p className="text-muted-foreground">Configure accessibility features for your site</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Accessibility Statement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="statement">Statement</Label>
              <Textarea
                id="statement"
                {...register('statement')}
                placeholder="Your accessibility commitment statement..."
                rows={6}
              />
              <p className="text-xs text-muted-foreground">
                Describe your commitment to accessibility and WCAG compliance
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="wcagLevel">WCAG Conformance Level</Label>
              <Input
                id="wcagLevel"
                {...register('wcagLevel')}
                placeholder="AA"
              />
              <p className="text-xs text-muted-foreground">
                Target conformance level (A, AA, or AAA)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accessibility Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="enableHighContrast"
                {...register('enableHighContrast')}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="enableHighContrast" className="font-normal cursor-pointer">
                Enable High Contrast Mode
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="enableScreenReader"
                {...register('enableScreenReader')}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="enableScreenReader" className="font-normal cursor-pointer">
                Enable Screen Reader Support
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="enableKeyboardNav"
                {...register('enableKeyboardNav')}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="enableKeyboardNav" className="font-normal cursor-pointer">
                Enable Enhanced Keyboard Navigation
              </Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </form>
    </div>
  )
}
