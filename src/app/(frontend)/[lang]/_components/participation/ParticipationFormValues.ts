import { StartPage } from '@/payload-types'
import { z } from 'zod'

export const getParticipationSchema = (errorMessages?: StartPage['pariticipation']['form']) =>
  z
    .object({
      participants: z.array(
        z.object({
          name: z.string().min(1, errorMessages?.nameMissing),
          makeup: z.boolean().optional(),
          hairdresser: z.boolean().optional(),
        }),
      ),
      participantsKid: z.array(z.object({ name: z.string() })),
    })
    .transform((res) => {

      const participantsKid = res.participantsKid.filter((p) => !!p.name)
      return { ...res, participantsKid }
    })

export type ParticipationFormValues = z.infer<ReturnType<typeof getParticipationSchema>>
