import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { type GlobalConfig } from 'payload'

export const StartPage: GlobalConfig = {
  slug: 'start-page',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
  ],
}
