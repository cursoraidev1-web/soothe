'use client'

import { useState } from 'react'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/api'
import { toast } from 'sonner'

interface FileUploadProps {
  value?: string
  onChange: (url: string) => void
  label?: string
  accept?: string
}

export function FileUpload({ value, onChange, label = 'Upload File', accept = 'image/*' }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [altText, setAltText] = useState('')

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!altText && accept.includes('image')) {
      toast.error('Please provide alt text for accessibility')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('altText', altText || file.name)

    try {
      const response = await api.upload<any>('/media/upload', formData)
      onChange(response.url)
      toast.success('File uploaded successfully')
      setAltText('')
    } catch (error) {
      toast.error('Failed to upload file')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    onChange('')
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {value ? (
        <div className="relative">
          {accept.includes('image') && (
            <img src={value} alt="Uploaded" className="w-full max-w-xs h-auto rounded-lg" />
          )}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm text-muted-foreground truncate flex-1">{value}</span>
            <Button type="button" variant="ghost" size="icon" onClick={handleRemove}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {accept.includes('image') && (
            <Input
              placeholder="Alt text (required for images)"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
            />
          )}
          <input
            type="file"
            id={`file-upload-${label}`}
            className="hidden"
            onChange={handleUpload}
            accept={accept}
            disabled={uploading}
          />
          <label htmlFor={`file-upload-${label}`}>
            <Button type="button" variant="outline" disabled={uploading} asChild>
              <span className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                {uploading ? 'Uploading...' : 'Choose File'}
              </span>
            </Button>
          </label>
        </div>
      )}
    </div>
  )
}
