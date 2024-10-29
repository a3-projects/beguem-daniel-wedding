import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'
import { revalidateGlobal } from '@/utilities/getGlobals'

export const revalidateStartPage: GlobalAfterChangeHook = (args) => {
  const { doc, req } = args

  if (req.context?.skipRevalidation) {
    req.payload.logger.info(`Skipped revalidating start-page`)
  } else {
    req.payload.logger.info(`Revalidating start-page`)
    revalidateGlobal('start-page')

    req.payload.logger.info(`Revalidating path /${req.locale}`)
    revalidatePath(`/(frontend)/[lang]`, 'layout')
  }

  return doc
}
