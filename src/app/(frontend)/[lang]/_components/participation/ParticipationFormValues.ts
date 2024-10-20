import { StartPage } from '@/payload-types'
import { z } from 'zod'

export const getParticipationSchema = (errorMessages?: StartPage['pariticipation']['form']) =>
  z.object({
    participants: z.array(z.object({ name: z.string().min(1, errorMessages?.nameMissing) })),
    participantsMakeupHair: z.array(z.object({ name: z.string() })),
  })

export type ParticipationFormValues = z.infer<ReturnType<typeof getParticipationSchema>>
