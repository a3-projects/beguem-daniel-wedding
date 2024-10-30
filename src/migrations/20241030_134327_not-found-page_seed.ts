import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-mongodb'
import { commitTransaction, initTransaction, Payload, PayloadRequest } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await initTransaction(req)
  req.context = { skipRevalidation: true }
  await seedData({ payload, req })
  await commitTransaction(req)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {}

async function seedData({ payload, req }: MigrateUpArgs) {
  // Seed the start-page global for each language locale
  payload.logger.info(`— Seeding not-found-page for de...`)
  await payload.updateGlobal({
    slug: 'not-found-page',
    locale: 'de',
    publishSpecificLocale: 'de',
    data: {
      title: '404',
      subtitle: 'Oops, diese Seite gibt es nicht.',
      backToStartPage: 'Zurück zur Startseite',
    },
    req,
  })

  payload.logger.info(`— Seeding not-found-page for tr...`)
  await payload.updateGlobal({
    slug: 'not-found-page',
    locale: 'tr',
    publishSpecificLocale: 'tr',
    data: {
      title: '404',
      subtitle: 'Üzgünüm, bu sayfa mevcut değil.',
      backToStartPage: 'Ana sayfaya geri dön',
    },
    req,
  })

  payload.logger.info(`— Seeding not-found-page for sr...`)
  await payload.updateGlobal({
    slug: 'not-found-page',
    locale: 'sr',
    publishSpecificLocale: 'sr',
    data: {
      title: '404',
      subtitle: 'Žao nam je, ova stranica ne postoji.',
      backToStartPage: 'Povratak na početnu stranu',
    },
    req,
  })
}
