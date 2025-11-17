'use client'

import { useEffect, useRef } from 'react'
import { Label } from '@/components/ui/label'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
}

export function RichTextEditor({ value, onChange, label, placeholder }: RichTextEditorProps) {
  const quillRef = useRef<any>(null)
  const editorRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('react-quill').then((mod) => {
        const ReactQuill = mod.default
        import('react-quill/dist/quill.snow.css')

        if (editorRef.current && !quillRef.current) {
          quillRef.current = ReactQuill
        }
      })
    }
  }, [])

  // Ensure value is always a string
  const safeValue = typeof value === 'string' ? value : ''

  // Simple textarea fallback
  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <textarea
        value={safeValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Write your content here...'}
        className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
        style={{ fontFamily: 'monospace' }}
      />
      <p className="text-xs text-muted-foreground">
        Enter plain text or JSON content. Text will be automatically formatted for storage.
      </p>
    </div>
  )
}
