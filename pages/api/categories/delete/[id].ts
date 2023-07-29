import { corsMiddleware } from '@/middlewares/cors.middleware'
import withTokenMiddleware from '@/middlewares/token.middleware'
import { PrismaClient } from '@prisma/client'
import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'

const cors = corsMiddleware(Cors({ methods: ['DELETE'] }))

const prisma = new PrismaClient()

export default withTokenMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    return await prisma.$transaction(async (tx) => {
      await cors(req, res)

      if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Método não permitido' })
      }

      const query = req.query

      const id = req.userId

      const userFound = await tx.user.findUnique({ where: { id } })

      if (!userFound) {
        return res.status(404).json({ message: 'Você não tem permissão.' })
      }

      if (!userFound.isAdmin) {
        return res.status(400).json({ message: 'Você não tem permissão.' })
      }

      await tx.category.delete({ where: { id: query.id?.toString() } })

      return res
        .status(200)
        .json({ message: 'Categoria deletada com sucesso!' })
    })
  }
)
