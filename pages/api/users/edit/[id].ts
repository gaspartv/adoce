import { UserRes } from '@/mappers/users'
import { corsMiddleware } from '@/middlewares/cors.middleware'
import withTokenMiddleware from '@/middlewares/token.middleware'
import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcryptjs'
import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'
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
            name: yup.string().min(3).max(30).optional(),
            email: yup.string().email().optional(),
            password: yup.string().min(8).optional(),
          })
          .validate(req.body, {
            stripUnknown: true,
            abortEarly: false,
          })

        req.body = validatedBody
      } catch ({ message }: any) {
        return res.status(400).json({ message })
      }

      const { id } = req.query

      const userToken = await tx.user.findUnique({
        where: { id: req.userId },
      })

      if (userToken?.id !== id && !userToken?.isAdmin) {
        return res.status(400).json({ message: 'Você não tem permissão.' })
      }

      const userFound = await tx.user.findUnique({
        where: { id: id?.toString() },
      })

      if (!userFound) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
      }

      if (req.body.password) {
        req.body.password = hashSync(req.body.password, 10)
      }

      const userEdit = await tx.user.update({
        where: { id: id?.toString() },
        data: req.body,
      })

      const user = UserRes.handle(userEdit)

      return res.status(200).json(user)
    })
  }
)
