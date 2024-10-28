import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { revalidateStartPage } from '@/globals/StartPage/hooks/revalidate-start-page'
import { type GlobalConfig } from 'payload'

export const StartPage: GlobalConfig = {
  slug: 'start-page',
  label: 'Startseite',
  access: {
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateStartPage],
  },
  fields: [
    {
      name: 'general',
      type: 'group',
      label: 'Allgemein',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'weddingDate',
              label: 'Hochzeitsdatum',
              type: 'date',
              required: true,
            },
            {
              name: 'participationDeadline',
              label: 'Teilnahmefrist',
              type: 'date',
              required: true,
            },
          ],
        },
        {
          name: 'phoneNumber',
          label: 'Telefonnummer',
          type: 'text',
          required: true,
        },
        {
          name: 'participationDeadlineInformation',
          label: 'Information Teilnahmefrist',
          type: 'text',
          admin: {
            description: 'Variable: {{deadlineDate}}',
          },
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'start',
      type: 'group',
      label: 'Startbereich',
      fields: [
        {
          name: 'backgroundImage',
          label: 'Hintergrundbild',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          label: 'Überschrift',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'buttonText',
          label: 'Button Text',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'information',
      type: 'group',
      label: 'Informationen',
      fields: [
        {
          name: 'title',
          label: 'Überschrift',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'subtitle',
          label: 'Unterüberschrift',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'richText',
          localized: true,
          required: true,
        },
      ],
    },

    {
      name: 'pariticipation',
      type: 'group',
      label: 'Teilnahmebestätigung',
      fields: [
        {
          name: 'title',
          label: 'Überschrift',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'subtitle',
          label: 'Unterüberschrift',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'form',
          type: 'group',
          label: 'Formular',
          fields: [
            {
              name: 'participants',
              label: 'Teilnehmer',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'paricipantPlaceholder',
              label: 'Name des Teilnehmers',
              type: 'text',
              localized: true,
              required: true,
            },

            {
              name: 'addParticipant',
              label: 'Teilnehmer hinzufügen',
              type: 'text',
              localized: true,
              required: true,
            },

            {
              name: 'participantKid',
              label: 'Teilnehmer Kind',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'paricipantKidPlaceholder',
              label: 'Name des Kindes',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'addParticipantKid',
              label: 'Kind hinzufügen',
              type: 'text',
              localized: true,
              required: true,
            },

            {
              name: 'makeupHairInfo',
              label: 'Information Makeup / Friseur',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'makeupHairPrice',
              label: 'Preis Makeup / Friseur',
              type: 'number',
              localized: true,
              required: true,
            },
            {
              name: 'makeup',
              label: 'Makeup',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'hairdresser',
              label: 'Friseur',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'buttonText',
              label: 'Button Text',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'nameMissing',
              label: 'Fehlermeldung: Name fehlt',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'unexpectedError',
              label: 'Unerwarteter Fehler',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
        {
          name: 'formSuccess',
          type: 'group',
          label: 'Erfolgreiche Teilnahme',
          fields: [
            {
              name: 'title',
              label: 'Überschrift',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'subtitle',
              label: 'Unterüberschrift',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'backToStartPage',
              label: 'Zurück zur Startseite Button',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'countdown',
      type: 'group',
      label: 'Countdown',
      fields: [
        {
          name: 'title',
          label: 'Überschrift',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'days',
              label: 'Tage',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'hours',
              label: 'Stunden',
              type: 'text',
              localized: true,
              required: true,
            },

            {
              name: 'minutes',
              label: 'Minuten',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'seconds',
              label: 'Sekunden',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'location',
      type: 'group',
      label: 'Location',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'image1',
              label: 'Bild 1',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'image2',
              label: 'Bild 2',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'image3',
              label: 'Bild 3',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        { name: 'title', label: 'Überschrift', type: 'text', required: true, localized: true },
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'address',
          label: 'Adresse',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'time',
          label: 'Uhrzeit',
          type: 'text',
          required: true,
        },
        {
          name: 'mapsLink',
          label: 'Google Maps Link',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'buttonText',
          label: 'Button Text',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Fußzeile',
      fields: [
        {
          name: 'title',
          label: 'Überschrift',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'subtitle',
          label: 'Unterüberschrift',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
  ],
}
