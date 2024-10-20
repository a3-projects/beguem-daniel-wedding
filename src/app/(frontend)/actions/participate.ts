'use server'
import {
  ParticipationFormValues,
  getParticipationSchema,
} from '@/app/(frontend)/[lang]/_components/participation/ParticipationFormValues'
import configPromise from '@payload-config'

import { getPayloadHMR } from '@payloadcms/next/utilities'

export const participate = async (prevState: any, values: ParticipationFormValues) => {
  const res = getParticipationSchema().safeParse(values)

  const payload = await getPayloadHMR({ config: configPromise })

  if (res.data) {
    payload.create({
      collection: 'participation',
      data: {
        participants: res.data.participants,
        participantsMakeupHair: res.data.participantsMakeupHair,
      },
    })
  }

  return res
}
