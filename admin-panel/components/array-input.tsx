'use client'

import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ArrayInputProps {
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  label?: string
}

export function ArrayInput({
  value = [],
  onChange,
  placeholder = 'Add item',
  label,
}: ArrayInputProps) {
  const [input, setInput] = useState('')
  
  // Ensure value is always an array
  const safeValue = Array.isArray(value) ? value : []

  const addItem = () => {
    if (input.trim()) {
      onChange([...safeValue, input.trim()])
      setInput('')
    }
  }

  const removeItem = (index: number) => {
    onChange(safeValue.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addItem()
    }
  }

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          onKeyPress={handleKeyPress}
        />
        <Button type="button" onClick={addItem} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-1">
        {safeValue.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex-1 p-2 bg-muted rounded text-sm">{item}</div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeItem(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
