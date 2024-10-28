import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateStartPage: GlobalAfterChangeHook = ({ doc, req }) => {
  if (req.context?.skipRevalidation) {
    req.payload.logger.info(`Skipped revalidating start-page`)
  } else {
    req.payload.logger.info(`Revalidating start-page`)
    revalidateTag('global_start-page')
  }

  return doc
}
