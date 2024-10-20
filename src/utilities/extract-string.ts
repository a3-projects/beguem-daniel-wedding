export const extractString = <T extends object>(
  obj: string | T | null | undefined,
  property: keyof T,
) => {
  if (!obj) return ''
  else if (typeof obj === 'string') return obj
  else {
    const value = obj[property]
    if (typeof value === 'string') {
      return value
    } else {
      return ''
    }
  }
}
