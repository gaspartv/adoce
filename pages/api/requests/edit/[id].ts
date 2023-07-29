import { corsMiddleware } from '@/middlewares/cors.middleware'
import withTokenMiddleware from '@/middlewares/token.middleware'
import { PrismaClient } from '@prisma/client'
import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import * as yup from 'yup'

const cors = corsMiddleware(Cors({ methods: ['PATCH'] }))

const prisma = new PrismaClient()

export default withTokenMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    return await prisma.$transaction(async (tx) => {
      await cors(req, res)

      if (req.method !== 'PATCH') {
        return res.status(405).json({ message: 'Método não permitido' })
      }

      try {
        const validatedBody = await yup
          .object()
          .shape({
            status: yup.string().required(),
            description: yup.string().optional(),
          })
          .validate(req.body, {
            stripUnknown: true,
            abortEarly: false,
          })

        req.body = validatedBody
      } catch ({ message }: any) {
        return res.status(400).json({ message })
      }

      const dto = req.body

      const query = req.query

      const id = req.userId

      const userFound = await tx.user.findUnique({ where: { id } })

      if (!userFound) {
        return res.status(404).json({ message: 'Você não tem permissão.' })
      }

      if (!userFound?.isAdmin) {
        return res.status(400).json({ message: 'Você não tem permissão.' })
      }

      const requestEdit = await tx.request.update({
        where: { id: query.id?.toString() },
        include: { itens: true, client: true },
        data: dto,
      })

      if (requestEdit.status === 'Finalizado') {
        requestEdit.itens.forEach(async (item) => {
          const product = await tx.product.findFirst({
            where: { name: item.name },
          })

          if (!product) {
            return res.status(400).json({ message: 'Produto não encontrado.' })
          }

          await tx.product.update({
            where: { id: product.id },
            data: { stock: Number(product.stock) - Number(item.count) },
          })
        })
      }

      const transporter = nodemailer.createTransport({
        host: process.env.SMTPHOST,
        port: Number(process.env.SMTPPORT),
        auth: {
          user: process.env.SMTPUSER,
          pass: process.env.SMTPPASSWORD,
        },
      })

      transporter
        .sendMail({
          from: process.env.SMTPUSER,
          to: requestEdit.client.email,
          replyTo: requestEdit.client.email,
          subject: `Status do seu pedido atualizado.`,
          html: `<p>O status do seu pedido <strong>${
            requestEdit.number
          }</strong> foi atualizado para <strong>${
            requestEdit.status
          }</strong>.</p>
        ${
          requestEdit.description
            ? '<p><strong>Descrição: </strong>' +
              requestEdit.description +
              '</p>'
            : ''
        }
        `,
        })
        .then((res) => res)
        .catch((error) => console.error(error))

      return res.status(200).json(requestEdit)
    })
  }
)
