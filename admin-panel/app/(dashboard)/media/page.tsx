'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Upload, Trash2, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { api } from '@/lib/api'
import type { Media } from '@/lib/types'

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [search, setSearch] = useState('')
  const [altText, setAltText] = useState('')

  useEffect(() => {
    fetchMedia()
  }, [search])

  const fetchMedia = async () => {
    try {
      setLoading(true)
      const response = await api.get<Media[]>(`/media?search=${search}`)
      setMedia(response)
    } catch (error) {
      toast.error('Failed to fetch media')
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!altText && file.type.startsWith('image/')) {
      toast.error('Please provide alt text for accessibility')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('altText', altText || file.name)

    try {
      await api.upload<Media>('/media/upload', formData)
      toast.success('File uploaded successfully')
      setAltText('')
      fetchMedia()
      // Reset file input
      e.target.value = ''
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to upload file')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return

    try {
      await api.delete(`/media/${id}`)
      toast.success('File deleted successfully')
      fetchMedia()
    } catch (error) {
      toast.error('Failed to delete file')
    }
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast.success('URL copied to clipboard')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Media Library</h1>
        <p className="text-muted-foreground">Upload and manage media files</p>
      </div>

      {/* Upload Section */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Upload New File</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="altText">Alt Text (required for images)</Label>
            <Input
              id="altText"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Describe the image for accessibility"
            />
          </div>
          <div className="flex items-center gap-4">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />
            <label htmlFor="file-upload">
              <Button type="button" disabled={uploading} asChild>
                <span>
                  <Upload className="mr-2 h-4 w-4" />
                  {uploading ? 'Uploading...' : 'Choose File'}
                </span>
              </Button>
            </label>
            <p className="text-sm text-muted-foreground">
              Supported formats: Images, PDFs, Documents
            </p>
          </div>
        </div>
      </Card>

      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-96">Loading...</div>
      ) : media.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 text-center">
          <Upload className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium">No media files yet</p>
          <p className="text-muted-foreground">Upload your first file to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-square bg-gray-100 relative">
                {item.mimeType?.startsWith('image/') ? (
                  <img
                    src={item.url}
                    alt={item.altText || item.filename}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl">📄</span>
                  </div>
                )}
              </div>
              <div className="p-3 space-y-2">
                <p className="text-sm font-medium truncate" title={item.filename}>
                  {item.filename}
                </p>
                {item.altText && (
                  <p className="text-xs text-muted-foreground truncate" title={item.altText}>
                    {item.altText}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  {(item.size / 1024).toFixed(1)} KB
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => copyUrl(item.url)}
                  >
                    Copy URL
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
