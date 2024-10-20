'use client'

import { CommonFormFieldProps, FormField, getFormState } from '@/ui/components/FormField'
import { Input } from '@/ui/components/Input'
import { useId } from 'react'
import type { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'

export const textField = tv({
  base: '',
})

export interface TextFieldProps extends CommonFormFieldProps {
  captionSlot?: React.ReactNode
  afterLabelSlot?: React.ReactNode
}

const _TextField = (props: TextFieldProps & ComponentProps<typeof Input>) => {
  const { children, className, state, label, errors, captionSlot, afterLabelSlot, ref, ...rest } =
    props

  const formState = getFormState(props)
  const fieldId = useId()

  return (
    <FormField state={formState}>
      <FormField.Label htmlFor={fieldId}>{label}</FormField.Label>
      {afterLabelSlot}
      <Input ref={ref} id={fieldId} className={textField({ className })} {...rest} />
      {!!errors && (
        <FormField.Caption>
          {(typeof errors === 'string' ? errors : errors?.message) ?? 'Fehler'}
        </FormField.Caption>
      )}
      {!errors && captionSlot}

      {children}
    </FormField>
  )
}

export const TextField = Object.assign(_TextField, {
  Caption: FormField.Caption,
  Affix: Input.Affix,
})
