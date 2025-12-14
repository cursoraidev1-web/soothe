import { generateHTML } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

export function renderTiptapContent(json: any) {
  if (!json || typeof json !== 'object') return ''

  try {
    return generateHTML(json, [StarterKit])
  } catch (e) {
    console.error('TipTap render error:', e)
    return ''
  }
}
