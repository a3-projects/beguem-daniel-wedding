// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'

import { seoPlugin } from '@payloadcms/plugin-seo'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import sharp from 'sharp' // editor-import
import { UnderlineFeature } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import Users from './collections/Users'
import { seedHandler } from './endpoints/seedHandler'
import { StartPage } from './globals/StartPage/config'

import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { en } from '@payloadcms/translations/languages/en'
import { de } from '@payloadcms/translations/languages/de'
import { Participation } from '@/collections/Participation'
import { participationsExport } from '@/endpoints/participations-export'
import { s3Storage } from '@payloadcms/storage-s3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle: GenerateTitle<{ title: string }> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<{ slug: string }> = ({ doc }) => {
  return doc?.slug
    ? `${process.env.NEXT_PUBLIC_SERVER_URL!}/${doc.slug}`
    : process.env.NEXT_PUBLIC_SERVER_URL!
}

export default buildConfig({
  localization: {
    locales: ['de', 'tr', 'sr'], // required
    defaultLocale: 'de', // required
    fallback: true,
  },
  i18n: {
    // @ts-ignore seems to work even with error
    supportedLanguages: { en, de },
  },
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: lexicalEditor({
    features: () => {
      return [UnderlineFeature(), BoldFeature(), ItalicFeature()]
    },
  }),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [Media, Participation, Users],
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  endpoints: [
    // The seed endpoint is used to populate the database with some example data
    // You should delete this endpoint before deploying your site to production
    {
      handler: participationsExport,
      method: 'get',
      path: '/participations-export',
    },
    {
      handler: seedHandler,
      method: 'get',
      path: '/seed',
    },
  ],
  globals: [StartPage],
  plugins: [
    seoPlugin({
      generateTitle,
      generateURL,
    }),

    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.MINIO_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.MINIO_ROOT_USER || '',
          secretAccessKey: process.env.MINIO_ROOT_PASSWORD || '',
        },
        endpoint: process.env.MINIO_ADDRESS || '',
        region: 'eu-central-1',
        forcePathStyle: true,
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET!,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
