import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { ParticipationExportButton } from '@/components/ParticipationExportButton'

export const Participation: CollectionConfig = {
  slug: 'participation',
  access: {
    create: anyone,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    components: {
      Description: { path: '@/components/ParticipationExportButton' },
    },
  },
  fields: [
    {
      name: 'participants',
      label: 'Teilnehmer',
      type: 'array',
      minRows: 1,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              label: 'Name',
              type: 'text',
              required: true,
            },
            {
              name: 'makeup',
              label: 'Makeup',
              type: 'checkbox',
            },
            {
              name: 'hairdresser',
              label: 'Friseur',
              type: 'checkbox',
            },
          ],
        },
      ],
    },
    {
      name: 'participantsKid',
      label: 'Teilnehmer Kind (bis 3 Jahre)',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
