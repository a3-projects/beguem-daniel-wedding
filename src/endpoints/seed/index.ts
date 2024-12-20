import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest } from 'payload'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const collections: CollectionSlug[] = ['media']
const globals: GlobalSlug[] = ['start-page']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not

  payload.logger.info(`— Clearing media...`)

  const mediaDir = path.resolve(dirname, '../../public/media')
  if (fs.existsSync(mediaDir)) {
    fs.rmdirSync(mediaDir, { recursive: true })
  }

  payload.logger.info(`— Clearing collections...`)

  for (const collection of collections) {
    await payload.delete({
      collection: collection,
      where: {
        id: {
          exists: true,
        },
      },
      req,
    })
  }

  payload.logger.info(`— Seeding demo author and user...`)

  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: 'demo-author@payloadcms.com',
      },
    },
    req,
  })

  const demoAuthor = await payload.create({
    collection: 'users',
    data: {
      name: 'Demo Author',
      email: 'demo-author@payloadcms.com',
      password: 'password',
    },
    req,
  })

  let demoAuthorID: number | string = demoAuthor.id

  payload.logger.info(`— Seeding media...`)

  const heroCouple = await payload.create({
    collection: 'media',
    data: {},
    filePath: path.resolve(dirname, 'hero-couple.jpg'),
    req,
  })

  const locationImage1 = await payload.create({
    collection: 'media',
    data: {},
    filePath: path.resolve(dirname, 'gardos-tower.webp'),
    req,
  })

  const locationImage2 = await payload.create({
    collection: 'media',
    data: {},
    filePath: path.resolve(dirname, 'gardos-tower-outside.jpg'),
    req,
  })

  const locationImage3 = await payload.create({
    collection: 'media',
    data: {},
    filePath: path.resolve(dirname, 'gardos-tower-outside-2.jpg'),
    req,
  })

  // let image1ID: number | string = image1Doc.id
  // let image2ID: number | string = image2Doc.id
  // let image3ID: number | string = image3Doc.id
  // let imageHomeID: number | string = imageHomeDoc.id

  // if (payload.db.defaultIDType === 'text') {
  //   image1ID = `"${image1Doc.id}"`
  //   image2ID = `"${image2Doc.id}"`
  //   image3ID = `"${image3Doc.id}"`
  //   imageHomeID = `"${imageHomeDoc.id}"`
  //   demoAuthorID = `"${demoAuthorID}"`
  // }

  // Seed the start-page global for each language locale
  payload.logger.info(`— Seeding start-page for de...`)
  await payload.updateGlobal({
    slug: 'start-page',
    locale: 'de',
    publishSpecificLocale: 'de',
    data: {
      general: {
        weddingDate: '2025-06-14',
        participationDeadlineInformation: 'Bitte bestätigt eure Teilnahme bis zum {{deadlineDate}}',
        participationDeadline: '2025-01-31',
        phoneNumber: '+49 4954 3450492',
      },
      start: {
        backgroundImage: heroCouple.id,
        title: 'Begüm & Daniel',
        description: 'Wir freuen uns darauf, unseren besonderen Tag mit euch zu teilen!',
        buttonText: 'Teilnahme bestätigen',
      },
      information: {
        title: 'Information',
        subtitle:
          'Hier teilen wir euch allgemeine Informationen mit. Schaut am besten immer wieder mal hier rein.',
        description: {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Eine Überschrift',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'heading',
                version: 1,
                tag: 'h1',
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Mit normalen Text',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'paragraph',
                version: 1,
                textFormat: 0,
                textStyle: '',
              },
              {
                children: [
                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Eine Liste',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'listitem',
                    version: 1,
                    value: 1,
                  },
                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Die nummeriert ist',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'listitem',
                    version: 1,
                    value: 2,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'list',
                version: 1,
                listType: 'number',
                start: 1,
                tag: 'ol',
              },
              {
                children: [],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'paragraph',
                version: 1,
                textFormat: 0,
                textStyle: '',
              },
              {
                children: [
                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Eine Liste',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'listitem',
                    version: 1,
                    value: 1,
                  },
                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Die nicht nummeriert ist',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'listitem',
                    version: 1,
                    value: 2,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'list',
                version: 1,
                listType: 'bullet',
                start: 1,
                tag: 'ul',
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Ein ',
                    type: 'text',
                    version: 1,
                  },
                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Link',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'link',
                    version: 3,
                    fields: {
                      url: 'https://google.de',
                      newTab: true,
                      linkType: 'custom',
                    },
                    id: '671fad8a4782f74997ea092e',
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'paragraph',
                version: 1,
                textFormat: 0,
                textStyle: '',
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Ein Bild',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'paragraph',
                version: 1,
                textFormat: 0,
                textStyle: '',
              },
              {
                children: [],
                direction: null,
                format: '',
                indent: 0,
                type: 'paragraph',
                version: 1,
                textFormat: 0,
                textStyle: '',
              },
              {
                format: '',
                type: 'upload',
                version: 3,
                id: '671faf5a4782f74997ea092f',
                fields: null,
                relationTo: 'media',
                value: heroCouple.id,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
      },
      pariticipation: {
        title: 'Wir freuen uns auf Euch!',
        subtitle:
          'Bitte gib hier kurz an, wer an der Feier teilnimmt und wer zum Friseur/Makeup mitkommen möchte.',
        form: {
          participants: 'Teilnehmer',
          addParticipant: 'Teilnehmer hinzufügen',
          paricipantPlaceholder: 'Name des Teilnehmers',
          paricipantKidPlaceholder: 'Name des Kindes',

          participantKid: 'Teilnehmer Kind (bis 3 Jahre)',
          addParticipantKid: 'Kind hinzufügen',
          makeupHairInfo: '60€ pro Person.',
          makeupHairPrice: 60,
          hairdresser: 'Friseur',
          makeup: 'Makeup',
          buttonText: 'Teilnahme bestätigen',
          nameMissing: 'Bitte gib einen Namen ein.',
          unexpectedError:
            'Ein unerwarteter Fehler ist aufgetreten. Bitte schreib uns auf WhatsApp oder ruf uns an.',
        },
        formSuccess: {
          backToStartPage: 'Zurück zur Startseite',
          title: 'Teilnahme bestätigt',
          subtitle:
            'Wir freuen uns auf dich! Falls sich etwas an deiner Teilnahme ändert, gib uns einfach Bescheid.',
        },
      },
      countdown: {
        title: 'Bald ist es soweit!',
        days: 'Tage',
        hours: 'Stunden',
        minutes: 'Minuten',
        seconds: 'Sekunden',
      },
      location: {
        image1: locationImage1.id,
        image2: locationImage2.id,
        image3: locationImage3.id,
        title: 'Location',
        name: 'Gardos Turm',
        address: 'Grobljanska BB, Belgrad 11080, Serbien',
        buttonText: 'Google Maps',
        time: '18:00 - 21:00',
        mapsLink:
          'https://www.google.com/maps/place/Restaurant+Gardos/@44.848237,20.4044287,16z/data=!3m1!4b1!4m6!3m5!1s0x475a65a0fd0e7c1d:0xba29e72b79de3ac!8m2!3d44.8482371!4d20.409305!16s%2Fg%2F11c5zxfc_d?entry=ttu&g_ep=EgoyMDI0MTAxNi4wIKXMDSoASAFQAw%3D%3D',
      },
      footer: {
        title: 'Noch fragen?',
        subtitle: 'Ruft uns an oder schreibt uns einfach auf WhatsApp!',
      },
    },
    req,
  })

  payload.logger.info(`— Seeding start-page for tr...`)
  await payload.updateGlobal({
    slug: 'start-page',
    locale: 'tr',
    publishSpecificLocale: 'tr',

    data: {
      general: {
        weddingDate: '2025-06-14',
        participationDeadlineInformation: 'Bitte bestätigt eure Teilnahme bis zum {{deadlineDate}}',
        participationDeadline: '2025-01-31',
        phoneNumber: '+49 4954 3450492',
      },
      start: {
        backgroundImage: heroCouple.id,
        title: 'Begüm & Daniel',
        description: 'Özel günümüzü sizinle paylaşmayı dört gözle bekliyoruz!',
        buttonText: 'Katılımı onayla',
      },
      information: {
        title: 'Bilgi',
        subtitle: 'Burada size genel bilgiler paylaşacağız. Ara sıra buraya göz atın.',
        description: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Örnek ',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
      pariticipation: {
        title: 'Sizinle birlikte olmayı dört gözle bekliyoruz!',
        subtitle:
          'Lütfen burada kimin katılacağını ve kimin kuaför/makyaj için gelmek istediğini belirtin.',
        form: {
          participants: 'Katılımcılar',
          addParticipant: 'Katılımcı ekle',
          paricipantPlaceholder: 'Katılımcının adı',
          paricipantKidPlaceholder: 'Çocuğun adı',

          participantKid: 'Çocuk katılımcı (3 yaşına kadar)',
          addParticipantKid: 'Çocuk ekle',
          makeupHairInfo: 'Kişi başı 60€.',
          makeupHairPrice: 60,
          hairdresser: 'Kuaför',
          makeup: 'Makyaj',
          buttonText: 'Katılımı onayla',
          nameMissing: 'Lütfen bir isim girin.',

          unexpectedError:
            'Ein unerwarteter Fehler ist aufgetreten. Bitte schreib uns auf WhatsApp oder ruf uns an.',
        },
        formSuccess: {
          backToStartPage: 'Ana sayfaya dön',
          title: 'Katılım onaylandı',
          subtitle:
            'Sizinle birlikte olmayı dört gözle bekliyoruz! Katılımınızla ilgili bir değişiklik olursa, lütfen bize haber verin.',
        },
      },
      countdown: {
        title: 'Yakında!',
        days: 'Gün',
        hours: 'Saat',
        minutes: 'Dakika',
        seconds: 'Saniye',
      },
      location: {
        image1: locationImage1.id,
        image2: locationImage2.id,
        image3: locationImage3.id,
        title: 'Mekan',
        name: 'Gardoš Kulesi',
        address: 'Grobljanska BB, Belgrad 11080, Sırbistan',
        buttonText: 'Google Haritalar',
        time: '18:00 - 21:00',
        mapsLink:
          'https://www.google.com/maps/place/Restaurant+Gardos/@44.848237,20.4044287,16z/data=!3m1!4b1!4m6!3m5!1s0x475a65a0fd0e7c1d:0xba29e72b79de3ac!8m2!3d44.8482371!4d20.409305!16s%2Fg%2F11c5zxfc_d?entry=ttu&g_ep=EgoyMDI0MTAxNi4wIKXMDSoASAFQAw%3D%3D',
      },
      footer: {
        title: 'Başka sorularınız mı var?',
        subtitle: 'Bizi arayın veya WhatsApp üzerinden bize yazın!',
      },
    },
    req,
  })

  payload.logger.info(`— Seeding start-page for sr...`)
  await payload.updateGlobal({
    slug: 'start-page',
    locale: 'sr',
    publishSpecificLocale: 'sr',
    data: {
      general: {
        weddingDate: '2025-06-14',
        participationDeadlineInformation: 'Bitte bestätigt eure Teilnahme bis zum {{deadlineDate}}',
        participationDeadline: '2025-01-31',
        phoneNumber: '+49 4954 3450492',
      },
      start: {
        backgroundImage: heroCouple.id,
        title: 'Бегум & Даниел',
        description: 'Радујемо се што ћемо поделити наш посебан дан са вама!',
        buttonText: 'Потврди учешће',
      },
      information: {
        title: 'Информације',
        subtitle: 'Овде ћемо вам делити опште информације. Погледајте овде повремено.',
        description: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Пример ',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
      pariticipation: {
        title: 'Радујемо се што ћете бити са нама!',
        subtitle:
          'Молимо вас да овде наведете ко ће присуствовати и ко жели да дође на фризуру/шминку.',
        form: {
          participants: 'Учесници',
          addParticipant: 'Додај учесника',
          paricipantPlaceholder: 'Име учесника',
          paricipantKidPlaceholder: 'Име детета',

          participantKid: 'Дете учесник (до 3 године)',
          addParticipantKid: 'Додај дете',
          makeupHairInfo: '60€ по особи.',
          makeupHairPrice: 60,
          hairdresser: 'Фризер',
          makeup: 'Шминка',
          buttonText: 'Потврди учешће',
          nameMissing: 'Молимо вас да унесете име.',
          unexpectedError:
            'Ein unerwarteter Fehler ist aufgetreten. Bitte schreib uns auf WhatsApp oder ruf uns an.',
        },
        formSuccess: {
          backToStartPage: 'Назад на почетну страницу',
          title: 'Учешће потврђено',
          subtitle:
            'Радујемо се што ћете бити са нама! Ако се нешто промени у вези са вашим учешћем, молимо вас да нас обавестите.',
        },
      },
      countdown: {
        title: 'Ускоро!',
        days: 'Дана',
        hours: 'Сати',
        minutes: 'Минута',
        seconds: 'Секунди',
      },
      location: {
        image1: locationImage1.id,
        image2: locationImage2.id,
        image3: locationImage3.id,
        title: 'Локација',
        name: 'Кула Гардош',
        address: 'Гробљанска ББ, Београд 11080, Србија',
        buttonText: 'Гугл мапе',
        time: '18:00 - 21:00',
        mapsLink:
          'https://www.google.com/maps/place/Restaurant+Gardos/@44.848237,20.4044287,16z/data=!3m1!4b1!4m6!3m5!1s0x475a65a0fd0e7c1d:0xba29e72b79de3ac!8m2!3d44.8482371!4d20.409305!16s%2Fg%2F11c5zxfc_d?entry=ttu&g_ep=EgoyMDI0MTAxNi4wIKXMDSoASAFQAw%3D%3D',
      },
      footer: {
        title: 'Имате још питања?',
        subtitle: 'Позовите нас или нам пишите на WhatsApp!',
      },
    },
    req,
  })

  payload.logger.info('Seeded database successfully!')
}
