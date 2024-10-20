'use client'

import {
  ParticipationFormValues,
  getParticipationSchema,
} from '@/app/(frontend)/[lang]/_components/participation/ParticipationFormValues'
import { participate } from '@/app/(frontend)/actions/participate'
import { Button } from '@/ui/components/Button'
import { TextField } from '@/ui/components/TextField'
import { InfoIcon, PlusIcon, XIcon } from 'lucide-react'
import { useActionState, useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { StartPage } from '@/payload-types'
import { Text } from '@/ui/components/Text'
import { useParams, useRouter } from 'next/navigation'

export interface ParticipationFormProps {
  translations: StartPage['pariticipation']
}

export const ParticipationForm = (props: ParticipationFormProps) => {
  const { translations } = props
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ParticipationFormValues>({
    resolver: zodResolver(getParticipationSchema(translations.form)),
    mode: 'onBlur',
    defaultValues: {
      participants: [{ name: '' }],
      participantsMakeupHair: [{ name: '' }],
    },
  })

  const [state, participateAction, isPending] = useActionState(participate, null)
  const router = useRouter()
  const params = useParams()

  const handleFormSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault()
    await participateAction(data)

    router.push(`/${params.lang}/participiation-successfully-sent`)
  })
  const {
    fields: participantFields,
    append: addParticipant,
    remove: removeParticipant,
  } = useFieldArray({
    control,
    name: 'participants',
  })

  const {
    fields: participantMakeupHairFields,
    append: addParticipantMakeupHair,
    remove: removeParticipantMakeupHair,
  } = useFieldArray({
    control,
    name: 'participantsMakeupHair',
  })

  return (
    <form
      className="flex flex-col ~gap-6/10"
      onSubmit={(e) => {
        e.preventDefault()
        handleFormSubmit(e)
      }}
    >
      <div className="flex flex-col ~gap-2/4">
        {participantFields.map((field, index) => (
          <TextField
            key={field.id}
            placeholder={translations.form.paricipantPlaceholder}
            endSlot={
              index > 0 && (
                <TextField.Affix>
                  <Button
                    onPress={() => removeParticipant(index)}
                    color="neutral"
                    variant="ghost"
                    circle
                  >
                    <XIcon />
                  </Button>
                </TextField.Affix>
              )
            }
            label={index === 0 ? translations.form.participants : ''}
            errors={errors.participants?.[index]?.name}
            {...register(`participants.${index}.name`)}
          />
        ))}

        <Button
          className="self-start"
          onPress={() => addParticipant({ name: '' })}
          variant="outline"
          color="secondary"
          size="sm"
        >
          <Button.Start>
            <PlusIcon />
          </Button.Start>
          {translations.form.addParticipant}
        </Button>
      </div>

      <div className="flex flex-col ~gap-2/4">
        {participantMakeupHairFields.map((field, index) => (
          <TextField
            key={field.id}
            placeholder={translations.form.paricipantPlaceholder}
            endSlot={
              index > 0 && (
                <TextField.Affix>
                  <Button
                    onPress={() => removeParticipantMakeupHair(index)}
                    color="neutral"
                    variant="ghost"
                    circle
                  >
                    <XIcon />
                  </Button>
                </TextField.Affix>
              )
            }
            captionSlot={
              index === 0 && (
                <Text ty="caption" className="fl-text-step--1 flex gap-1 text-neutral-500">
                  <InfoIcon className="svg-font-size-scale mt-[3px]" />{' '}
                  {translations.form.makeupHairInfo}
                </Text>
              )
            }
            label={index === 0 ? translations.form.participantsMakeupHair : ''}
            errors={errors.participantsMakeupHair?.[index]?.name}
            {...register(`participantsMakeupHair.${index}.name`)}
          />
        ))}

        <Button
          className="self-start"
          onPress={() => addParticipantMakeupHair({ name: '' })}
          variant="outline"
          color="secondary"
          size="sm"
        >
          <Button.Start>
            <PlusIcon />
          </Button.Start>
          {translations.form.addParticipant}
        </Button>
      </div>

      <Button size="lg" isPending={isPending || isSubmitting} type="submit">
        {translations.form.buttonText}
      </Button>
    </form>
  )
}
