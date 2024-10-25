'use client'
import { Button } from '@payloadcms/ui'
import React from 'react'

export const ParticipationExportButton = () => {
  const handleExport = async () => {
    const response = await fetch('/api/participations-export')

    const blob = await response.blob()
    const url = window.URL.createObjectURL(new Blob([blob]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `teilnehmer_${Date.now()}.xlsx`)
    document.body.appendChild(link)
    link.click()
    link?.parentNode?.removeChild(link)
  }

  return (
    <div className=" ">
      <Button onClick={handleExport}>Export Excel</Button>
    </div>
  )
}

export default ParticipationExportButton
