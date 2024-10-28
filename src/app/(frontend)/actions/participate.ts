'use server'
import {
  ParticipationFormValues,
  getParticipationSchema,
} from '@/app/(frontend)/[lang]/_components/participation/ParticipationFormValues'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

export const participate = async (prevState: any, values: ParticipationFormValues) => {
  try {
    const res = getParticipationSchema().parse(values)

    const payload = await getPayloadHMR({ config: configPromise })

    await payload.create({
      collection: 'participation',
      data: {
        participants: res.participants,
        ...(!!res.participantsKid.length && { participantsKid: res.participantsKid }),
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Unexpected error when trying to save participation:', error?.message)
    return {
      success: false,
      error: error?.message || 'Unexpected error trying to save participation.',
    }
  }
}
