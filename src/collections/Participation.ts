import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Participation: CollectionConfig = {
  slug: 'participation',
  access: {
    create: anyone,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'participants',
      label: 'Teilnehmer',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      name: 'participantsMakeupHair',
      label: 'Teilnehmer Makeup / Friseur',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
  ],
}
