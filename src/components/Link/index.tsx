import { cn } from 'src/utilities/cn'
import Link from 'next/link'
import React from 'react'

import type { Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline'
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'posts'
    value: Post | string | number
  } | null
  size?: null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${!!reference?.relationTo ? `/${reference?.relationTo}` : ''}/${reference.value.slug}`
      : url

  if (!href) return null

  const size = appearance === 'inline' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <button className={className}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </button>
  )
}
