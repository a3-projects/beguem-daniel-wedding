import type { CollectionConfig, CollectionSlug, LabelFunction, StaticLabel } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
// export function createRowLabel({
//   defaultLabel,
//   path,
//   relationTo,
// }: {
//   defaultLabel: LabelFunction | StaticLabel
//   path: string
//   relationTo?: CollectionSlug
// }) {
//   return {
//     path: '@payload/components/row-label',
//     clientProps: {
//       defaultLabel: defaultLabel,
//       path: path,
//       relationTo: relationTo,
//     },
//   }
// }
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
      admin: {
        // initCollapsed: true,
        // components: {
        //   RowLabel: createRowLabel({
        //     defaultLabel: '',
        //     path: 'name',
        //   }),
        // },
      },
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
