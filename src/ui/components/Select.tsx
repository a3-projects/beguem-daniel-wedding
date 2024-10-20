import { focusRing } from '@/ui/utils/focus-ring'
import { composeTailwindRenderProps } from '@/ui/utils/utils.client'
import { CheckIcon, ChevronDownIcon, LanguagesIcon } from 'lucide-react'
import {
  Button,
  composeRenderProps,
  FieldError,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select as RACSelect,
  SelectValue,
  Text,
  type ListBoxItemProps,
  type SelectProps as RACSelectProps,
  type ValidationResult,
} from 'react-aria-components'
import { tv, VariantProps } from 'tailwind-variants'

export const select = tv({
  extend: focusRing,
  slots: {
    base: '',
    list: 'flex flex-col gap-2',
    button:
      'svg-font-scale flex items-center flex-row gap-2 text-white ~text-base/xl border border-white/50 bg-black/20 backdrop-blur-sm py-3 px-5 rounded',
    popover:
      'relative p-2  z-50 max-h-96 min-w-[10rem] overflow-hidden rounded border bg-neutral-50 text-neutral-500 shadow-md open:animate-in :animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  },
})

export interface SelectItem {
  label: string
  id: string
}
export interface SelectProps extends Omit<RACSelectProps<SelectItem>, 'children'> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  items?: Iterable<SelectItem>
  children: React.ReactNode | ((item: SelectItem) => React.ReactNode)
}

export function _Select({
  label,
  description,
  errorMessage,
  children,
  items,
  ...props
}: SelectProps) {
  const { popover, button, list } = select()
  return (
    <RACSelect {...props}>
      {label && <Label>{label}</Label>}
      <Button className={button()}>
        <LanguagesIcon />
        <SelectValue<SelectItem>>
          {({ selectedItem }) => <div>{selectedItem?.label}</div>}
        </SelectValue>
        <ChevronDownIcon size={20} />
      </Button>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className={popover()}>
        <ListBox className={list()} items={items}>
          {children}
        </ListBox>
      </Popover>
    </RACSelect>
  )
}
export const selectLinkItem = tv({
  slots: {
    base: 'relative flex w-full group first: cursor-pointer select-none ~text-base/lg items-center text-black rounded p-2  outline-none rac-hover:bg-neutral-200 rac-hover:text-neutral-600 rac-focused:bg-neutral-200 rac-focused:text-neutral-600 rac-disabled:pointer-events-none rac-disabled:opacity-50 rac-selected:bg-primary-100 rac-selected:text-primary-500',
    icon: 'group-rac-selected:opacity-100 opacity-0',
  },
  variants: {
    isFocused: {},
    isSelected: {},
  },
})

export interface SelectLinkItemProps extends VariantProps<typeof selectLinkItem> {}
export const SelectLinkItem = (props: SelectLinkItemProps & ListBoxItemProps) => {
  const { base, icon } = selectLinkItem()
  return (
    <ListBoxItem {...props} className={base()}>
      {composeRenderProps(props.children, (children) => (
        <div className="flex gap-2 items-center">
          <CheckIcon className={icon()} size={20} />
          {children}
        </div>
      ))}
    </ListBoxItem>
  )
}
export const Select = Object.assign(_Select, {
  LinkItem: SelectLinkItem,
})
