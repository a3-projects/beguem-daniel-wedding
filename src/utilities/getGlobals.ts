import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { revalidateTag, unstable_cache } from 'next/cache'
import { BasePayload, DataFromGlobalSlug, GlobalSlug } from 'payload'
import { Options } from 'node_modules/payload/dist/globals/operations/local/findOne'

type Global = keyof Config['globals']

const getGlobal: <TSlug extends GlobalSlug>(
  options: Options<TSlug>,
) => Promise<DataFromGlobalSlug<TSlug>> = async (options) => {
  const payload = await getPayloadHMR({ config: configPromise })
  console.log('______________________', options)

  const global = await payload.findGlobal(options)

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = <TSlug extends GlobalSlug>(options: Options<TSlug>) =>
  unstable_cache(
    async (): Promise<DataFromGlobalSlug<TSlug>> => getGlobal(options),
    [options.slug, options.locale || 'default'],
    {
      tags: [getGlobalRevalidateKey(options.slug, options.locale)],
    },
  )

export const getGlobalRevalidateKey = (slug: Global, locale: string = 'default') => {
  return `global_${slug}_${locale}`
}

export const revalidateGlobal = (slug: Global, locale: string = 'default') => {
  revalidateTag(getGlobalRevalidateKey(slug, locale))
}
