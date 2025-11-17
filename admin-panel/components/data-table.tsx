'use client'

import { ReactNode } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export interface Column {
  key: string
  label: string
  render?: (value: any, row: any) => ReactNode
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  loading?: boolean
  emptyMessage?: string
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
}

export function DataTable({
  columns,
  data,
  loading = false,
  emptyMessage = 'No data found',
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: DataTableProps) {
  // Defensive array checking to prevent "data.map is not a function" errors
  const safeData = Array.isArray(data) ? data : []

  if (loading) {
    return (
      <Card>
        <div className="p-6 space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="text-left p-4 text-sm font-medium"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {safeData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center p-8 text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              safeData.map((row, index) => (
                <tr
                  key={row.id || index}
                  className="border-t hover:bg-muted/50 transition-colors"
                >
                  {columns.map((column) => {
                    const value = row[column.key]
                    let displayValue = value
                    
                    // Handle render function
                    if (column.render) {
                      displayValue = column.render(value, row)
                    } 
                    // Handle object values (convert to string or show '-')
                    else if (value && typeof value === 'object') {
                      // If it's a date, format it
                      if (value instanceof Date) {
                        displayValue = value.toLocaleDateString()
                      } 
                      // For other objects, show placeholder or stringify
                      else {
                        displayValue = value.name || value.title || JSON.stringify(value)
                      }
                    }
                    // Handle null/undefined
                    else if (value === null || value === undefined) {
                      displayValue = '-'
                    }
                    // Handle boolean
                    else if (typeof value === 'boolean') {
                      displayValue = value ? 'Yes' : 'No'
                    }
                    
                    return (
                      <td key={column.key} className="p-4">
                        {displayValue}
                      </td>
                    )
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && onPageChange && (
        <div className="flex justify-between items-center p-4 border-t">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
