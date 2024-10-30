import { SUPPORTED_LOCALES } from '@/app/(frontend)/[lang]/_constants/supported-locales'
import { headers } from 'next/headers'
import { TypedLocale } from 'payload'

export const getLocaleOrDefault = async (): Promise<TypedLocale> => {
  const headersList = await headers()

  const acceptLocale = headersList.get('accept-language') || 'de'

  const preferredLang = acceptLocale.toLowerCase().split(',')[0].split('-')[0]
  const supportedLang = SUPPORTED_LOCALES.includes(preferredLang as TypedLocale)
    ? preferredLang
    : 'de'

  return supportedLang as TypedLocale
}
