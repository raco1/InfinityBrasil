/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchFreightDeliveredYesterdayService } from '@/services/fetch-freights-delivered-yesterday'
import { makeGetUserProfileService } from '@/services/factory/make-get-user-profile-service'
import { PrismaFreightsRepository } from '@/repositories/prisma/prisma-freight-repository'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { FastifyReply, FastifyRequest } from 'fastify'
import { Writable } from 'stream'
import PDFPrinter from 'pdfmake'
import cron from 'node-cron'
import path from 'path'
import fs from 'fs'

export async function relatory(request: FastifyRequest, reply: FastifyReply) {
  const freightRepository = new PrismaFreightsRepository()
  const fetchFreightHistoryService = new FetchFreightDeliveredYesterdayService(
    freightRepository,
  )
  const getUserProfile = makeGetUserProfileService()
  await request.jwtVerify()
  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  const delivererId = user.id
  const { freights } = await fetchFreightHistoryService.execute({
    deliverer_id: delivererId,
  })

  async function generateReport() {
    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique',
      },
    }
    const printer = new PDFPrinter(fonts)

    const body: any = []
    for await (const freight of freights) {
      if (freight.value && freight.fee !== null) {
        const deliver_salary = freight.value - freight.fee
        const rows: any = []
        rows.push(freight.id)
        rows.push(freight.distance)
        rows.push(freight.value)
        rows.push(freight.fee)
        rows.push(deliver_salary)
        body.push(rows)
      }
    }

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    const definitions: TDocumentDefinitions = {
      defaultStyle: { font: 'Helvetica' },
      content: [
        {
          columns: [
            {
              text: `Relatório de Fretes finalizados no dia ${yesterday.toLocaleDateString()}.`,
              style: 'header',
            },
          ],
        },
        {
          style: {
            alignment: 'center',
          },
          table: {
            widths: [80, 100, 100, 80, 100],
            heights: 28,
            body: [
              [
                { text: 'ID do frete', style: 'columnsTitle' },
                { text: 'Distância (em Km)', style: 'columnsTitle' },
                { text: 'Valor do Frete (em R$)', style: 'columnsTitle' },
                { text: 'Taxa (em R$)', style: 'columnsTitle' },
                { text: 'Valor do entregador (em R$)', style: 'columnsTitle' },
              ],
              ...body,
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        columnsTitle: {
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    }
    const pdfDoc = printer.createPdfKitDocument(definitions)
    const buffer: string | NodeJS.ArrayBufferView = await new Promise(
      (resolve, reject) => {
        const chunks: any = []
        const stream = new Writable({
          write: (chunk, _, next) => {
            chunks.push(chunk)
            next()
          },
        })
        stream.once('error', (err) => reject(err))
        stream.once('close', () => resolve(Buffer.concat(chunks)))

        pdfDoc.pipe(stream)
        pdfDoc.end()
      },
    )
    return buffer
  }
  const REPORT_PATH = path.join(__dirname, '..', 'temp', 'Relatório.pdf')

  cron.schedule('0 8 * * *', async () => {
    console.log('Gerando relatório diário às 8h...')

    try {
      const report = await generateReport()
      // Salva o relatório gerado em disco
      fs.writeFileSync(REPORT_PATH, report)
      console.log('Relatório diário salvo com sucesso.')
    } catch (error) {
      console.error('Falha ao gerar o relatório:', error)
    }
  })
  if (!fs.existsSync(REPORT_PATH)) {
    return reply.status(404).send({ error: 'Relatório ainda não foi gerado.' })
  }

  // Envia o arquivo como download para o usuário
  return reply.type('application/pdf').send(fs.createReadStream(REPORT_PATH))
}
