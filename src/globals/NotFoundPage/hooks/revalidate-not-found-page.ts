import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'
import { revalidateGlobal } from '@/utilities/getGlobals'

export const revalidateNotFoundPage: GlobalAfterChangeHook = (args) => {
  const { doc, req } = args

  if (req.context?.skipRevalidation) {
    req.payload.logger.info(`Skipped revalidating not-found-page`)
  } else {
    req.payload.logger.info(`Revalidating not-found-page`)
    revalidateGlobal('not-found-page')
  }

  return doc
}
