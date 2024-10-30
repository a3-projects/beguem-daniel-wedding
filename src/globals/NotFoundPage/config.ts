import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { revalidateNotFoundPage } from '@/globals/NotFoundPage/hooks/revalidate-not-found-page'
import { type GlobalConfig } from 'payload'

export const NotFoundPage: GlobalConfig = {
  slug: 'not-found-page',
  label: '404 Seite',
  access: {
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateNotFoundPage],
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'subtitle',
      label: 'Unterüberschrift',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'backToStartPage',
      label: 'backtoStartPage',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
}
