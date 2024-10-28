export const interpolate = (translation: string, interpolations: Record<string, string>) => {
  const interpolatedString = Object.entries(interpolations).reduce((res, [key, value]) => {
    return res.replace(`{{${key}}}`, value)
  }, translation)

  return interpolatedString
}
