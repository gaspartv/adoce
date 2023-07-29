import { ICreateUser } from '@/interfaces/session.interfaces'
import { UserRes } from '@/mappers/users'
import { corsMiddleware } from '@/middlewares/cors.middleware'
import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcryptjs'
import Cors from 'cors'
import { randomUUID } from 'crypto'
import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import * as yup from 'yup'

const cors = corsMiddleware(Cors({ methods: ['POST'] }))

const prisma = new PrismaClient()

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await prisma.$transaction(async (tx) => {
    await cors(req, res)

    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
      const validatedBody = await yup
        .object()
        .shape({
          name: yup.string().min(3).max(25).required(),
          email: yup.string().email().required(),
        })
        .validate(req.body, {
          stripUnknown: true,
          abortEarly: false,
        })

      req.body = validatedBody
    } catch ({ message }: any) {
      return res.status(400).json({ message })
    }

    const { name, email }: ICreateUser = req.body

    const userFound = await tx.user.findUnique({ where: { email } })

    if (userFound) {
      return res.status(400).json({ message: 'Email já cadastrado.' })
    }

    const password = Math.random().toString(36).slice(-10)

    const userCreate = await tx.user.create({
      data: {
        id: randomUUID(),
        email,
        name,
        password: hashSync(password, 10),
        isAdmin: (await tx.user.count()) === 0 ? true : false,
      },
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
        to: email,
        replyTo: email,
        subject: 'Cadastro realizado com sucesso - thygas-coins',
        html: `
      <p>Agradecemos sua preferência.</p>
      <p><strong>Sua senha: </strong>${password}</p>
      <br>
      <p>Dúvidas entrar em contato com nosso suporte <a href="https://api.whatsapp.com/send?phone=+55++5532999730864&text=Ol%C3%A1...">whatsapp</a></p>
      `,
      })
      .then((res) => res)
      .catch((error) => console.error(error))

    const user = UserRes.handle(userCreate)

    return res.status(201).json(user)
  })
}
