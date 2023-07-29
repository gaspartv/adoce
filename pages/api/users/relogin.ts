import { UserRes } from '@/mappers/users'
import { corsMiddleware } from '@/middlewares/cors.middleware'
import withTokenMiddleware from '@/middlewares/token.middleware'
import { PrismaClient } from '@prisma/client'
import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'

const cors = corsMiddleware(Cors({ methods: ['GET'] }))

const prisma = new PrismaClient()

export default withTokenMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    await cors(req, res)

    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Método não permitido' })
    }

    const id = req.userId

    const userFound = await prisma.user.findUnique({ where: { id } })

    if (!userFound) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    if (userFound.soft_delete) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    const user = UserRes.handle(userFound)

    return res.status(200).json(user)
  }
)
