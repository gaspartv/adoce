import { IUserRecovery } from '@/interfaces/users.interfaces'
import { corsMiddleware } from '@/middlewares/cors.middleware'
import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcryptjs'
import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import * as yup from 'yup'

const cors = corsMiddleware(Cors({ methods: ['PATCH'] }))

const prisma = new PrismaClient()

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await prisma.$transaction(async (tx) => {
    await cors(req, res)

    if (req.method !== 'PATCH') {
      return res.status(405).json({ message: 'Método não permitido' })
    }

    try {
      const validatedBody = await yup
        .object()
        .shape({ email: yup.string().email().required() })
        .validate(req.body, {
          stripUnknown: true,
          abortEarly: false,
        })

      req.body = validatedBody
    } catch ({ message }: any) {
      return res.status(400).json({ message })
    }

    const { email }: IUserRecovery = req.body

    const emailFound = await tx.user.findUnique({ where: { email } })

    if (!emailFound) {
      return res.status(404).json({ message: 'Email não cadastrado.' })
    }

    const password = Math.random().toString(36).slice(-10)

    const user = await tx.user.update({
      where: { email },
      data: { password: hashSync(password, 10) },
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
        to: user.email,
        replyTo: user.email,
        subject: 'Sua nova senha chegou! - thygas-coins',
        html: `
        <p><strong>Senha: </strong>${password}</p>
        <br>
        <p>Dúvidas entrar em contato com nosso suporte <a href="https://api.whatsapp.com/send?phone=+55++5532999730864&text=Ol%C3%A1...">whatsapp</a></p>
        `,
      })
      .then((res) => res)
      .catch((error) => console.error(error))

    return res.status(200).json({ message: 'Nova senha enviada por email.' })
  })
}
