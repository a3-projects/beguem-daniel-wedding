import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateStartPage: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating start-page`)

  revalidateTag('global_start-page')

  return doc
}
