import { corsMiddleware } from '@/middlewares/cors.middleware'
import withTokenMiddleware from '@/middlewares/token.middleware'
import { PrismaClient } from '@prisma/client'
import Cors from 'cors'
import { randomUUID } from 'crypto'
import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import * as yup from 'yup'

const cors = corsMiddleware(Cors({ methods: ['POST'] }))

const prisma = new PrismaClient()

export default withTokenMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    return await prisma.$transaction(async (tx) => {
      await cors(req, res)

      if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido' })
      }

      try {
        const validatedBody = await yup
          .object()
          .shape({
            total: yup.number().required(),
            status: yup.string().required(),
            itens: yup.array(
              yup.object().shape({
                name: yup.string().required(),
                count: yup.number().required(),
                price: yup.number().required(),
                character: yup.string().optional(),
                image: yup.string().required(),
              })
            ),
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

      const id = req.userId

      const userFound = await tx.user.findUnique({ where: { id } })

      if (!userFound) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
      }

      const requestCreate = await tx.request.create({
        data: {
          id: randomUUID(),
          number: Math.random().toString(36).slice(-10),
          total: dto.total,
          status: dto.status,
          clientId: userFound.id,
        },
      })

      await dto.itens.map(async (item: any) => {
        return await tx.requestItens.create({
          data: {
            id: randomUUID(),
            name: item.name,
            count: item.count,
            price: item.price,
            character: item.character || null,
            image: item.image,
            requestId: requestCreate.id,
          },
        })
      })

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
          to: process.env.SMTPUSER,
          replyTo: process.env.SMTPUSER,
          subject: `Novo pedido na Thygas-Coins.`,
          html: `
            <p><strong>ID Pedido: </strong> ${requestCreate.id}</p>
            <p><strong>ID Cliente: </strong> ${requestCreate.clientId}</p>
            <p><strong>Nº Pedido: </strong> ${requestCreate.number}</p>
            <p><strong>Data: </strong> ${requestCreate.createdAt}</p>
            <p><strong>Status: </strong> ${requestCreate.status}</p>
            <p><strong>Total: </strong> ${Number(
              requestCreate.total
            ).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}</p>
          `,
        })
        .then((res) => res)
        .catch((error) => console.error(error))

      return res.status(201).json(requestCreate)
    })
  }
)
