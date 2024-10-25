import { type PayloadHandler } from 'payload'
import * as XLSX from 'xlsx'
function autoFitColumns(worksheet: XLSX.WorkSheet) {
  const columnWidths: number[] = []

  // Find the maximum width for each column
  for (const cellAddress in worksheet) {
    if (cellAddress[0] === '!') continue

    const cell = worksheet[cellAddress]
    const columnIndex = XLSX.utils.decode_col(cellAddress.replace(/\d+/, ''))

    const cellWidth = cell.v ? cell.v.toString().length : 0
    columnWidths[columnIndex] = Math.max(columnWidths[columnIndex] || 0, cellWidth)
  }

  // Set the column widths
  worksheet['!cols'] = columnWidths.map((width) => ({ wch: width + 2 })) // Add 2 for padding
}
export const participationsExport: PayloadHandler = async (req): Promise<Response> => {
  const { payload, user } = req

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const participants = await payload.find({
    collection: 'participation',
  })
  const results = participants.docs

  if (results.length) {
    interface Row {
      'Nr.'?: string
      Teilnehmer?: string
      Makeup?: string
      Friseur?: string
      Kinder?: string
      ''?: string
      'Summe Teilnehmer'?: number
      'Summe Kinder'?: number
      'Summe Makeup'?: number
      'Summe Friseur'?: number
    }
    let data: Array<Row> = []
    const sumParticipants = results.reduce((sum, result) => {
      return sum + (result?.participants?.length ?? 0)
    }, 0)

    const sumKids = results.reduce((sum, result) => {
      return sum + (result?.participantsKid?.length ?? 0)
    }, 0)

    const sumHairdresser = results.reduce((sum, result) => {
      return sum + (result?.participants?.filter((p) => p.hairdresser).length ?? 0)
    }, 0)

    const sumMakeup = results.reduce((sum, result) => {
      return sum + (result?.participants?.filter((p) => p.makeup).length ?? 0)
    }, 0)

    data.push({
      'Nr.': '',
      Teilnehmer: '',
      Makeup: '',
      Friseur: '',
      Kinder: '',
      '': '',
      'Summe Teilnehmer': sumParticipants,
      'Summe Kinder': sumKids,
      'Summe Makeup': sumMakeup,
      'Summe Friseur': sumHairdresser,
    })
    results.forEach((result, index) => {
      const { participants, participantsKid } = result
      const length = Math.max(participants?.length ?? 0, participantsKid?.length ?? 0)

      data.push({})

      for (let i = 0; i <= length - 1; i++) {
        data.push({
          'Nr.': i === 0 ? (index + 1).toString() : '',
          Teilnehmer: participants?.[i]?.name ?? '',
          Makeup: participants?.[i]?.makeup
            ? 'Ja'
            : !participants?.[i]?.makeup && participants?.[i]?.name
              ? 'Nein'
              : '',
          Friseur: participants?.[i]?.hairdresser
            ? 'Ja'
            : !participants?.[i]?.hairdresser && participants?.[i]?.name
              ? 'Nein'
              : '',
          Kinder: participantsKid?.[i]?.name ?? '',
        })
      }
      data.push({})
    })

    const workbook = XLSX.utils.book_new()
    const sheetName = 'Teilnehmer'
    const worksheet = XLSX.utils.json_to_sheet(data)

    autoFitColumns(worksheet)

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
    const workbookBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' })
    const response = new Response(workbookBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=teilnehmer_${Date.now()}.xlsx`,
      },
    })

    return response
  }

  return new Response(null)
}
