import { corsMiddleware } from '@/middlewares/cors.middleware'
import withTokenMiddleware from '@/middlewares/token.middleware'
import { PrismaClient } from '@prisma/client'
import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

const cors = corsMiddleware(Cors({ methods: ['DELETE'] }))

const prisma = new PrismaClient()

export default withTokenMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    return await prisma.$transaction(async (tx) => {
      await cors(req, res)

      if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Método não permitido' })
      }

      const id = req.userId

      const userToken = await tx.user.findUnique({ where: { id } })

      if (userToken?.id !== req.query.id && !userToken?.isAdmin) {
        return res.status(400).json({ message: 'Você não tem permissão.' })
      }

      const userFound = await tx.user.findUnique({
        where: { id: req.query.id?.toString() },
      })

      if (!userFound) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
      }

      await tx.user.update({
        where: { id: req.query.id?.toString() },
        data: { soft_delete: true },
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
          to: userFound.email,
          replyTo: userFound.email,
          subject: 'Cadastro deletado!',
          html: `<p>Seu cadastro foi deletado com sucesso. Vamos sentir sua falta.</p>`,
        })
        .then((res) => res)
        .catch((error) => console.error(error))

      return res.status(200).json({ message: 'Cadastro deletado com sucesso!' })
    })
  }
)
