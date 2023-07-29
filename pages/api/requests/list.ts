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
      return res.status(400).json({ message: 'Você não tem permissão.' })
    }

    if (userFound.isAdmin) {
      const requests = await prisma.request.findMany({
        include: { itens: true, client: true },
      })

      const returnRequests = requests.map((request) => {
        return {
          ...request,
          client: {
            email: request.client.email,
            id: request.client.id,
            isAdmin: request.client.isAdmin,
            name: request.client.name,
            registered_at: request.client.registered_at,
            soft_delete: request.client.soft_delete,
          },
        }
      })

      return res.status(200).json(returnRequests)
    }

    const requests = await prisma.request.findMany({
      where: { clientId: req.userId },
      include: { itens: true, client: true },
    })

    const returnRequests = requests.map((request) => {
      return {
        ...request,
        client: {
          email: request.client.email,
          id: request.client.id,
          isAdmin: request.client.isAdmin,
          name: request.client.name,
          registered_at: request.client.registered_at,
          soft_delete: request.client.soft_delete,
        },
      }
    })

    return res.status(200).json(returnRequests)
  }
)
