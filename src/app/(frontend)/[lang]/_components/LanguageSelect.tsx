'use client'

import { ComponentProps } from 'react'
import { Select } from '@/ui/components/Select'
import { cn } from '@/ui/utils/utils'
import { Config } from '@/payload-types'

export type LanguageSelectProps = {
  className?: string
  lang: Config['locale']
  url?: URL
}

export const LanguageSelect = ({
  className,
  lang,
  url,
  ...props
}: LanguageSelectProps & Omit<ComponentProps<typeof Select>, 'children'>) => {
  const items: Array<{ label: string; id: Config['locale'] }> = [
    { label: 'Deutsch', id: 'de' },
    { label: 'Српски', id: 'sr' },
    { label: 'Türkçe', id: 'tr' },
  ]
  return (
    <div className={cn('sticky flex justify-end w-full top-0 z-50  h-0', className)}>
      <div className="~p-2/6">
        <Select
          aria-label="Select Language"
          className=""
          {...props}
          selectedKey={lang}
          items={items}
        >
          {(item) => (
            <Select.LinkItem key={item.id} href={`/${item.id}`} textValue={item.id}>
              {item.label}
            </Select.LinkItem>
          )}
        </Select>
      </div>
    </div>
  )
}
