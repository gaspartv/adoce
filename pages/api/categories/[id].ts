import { corsMiddleware } from '@/middlewares/cors.middleware'
import { PrismaClient } from '@prisma/client'
import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'

const cors = corsMiddleware(Cors({ methods: ['GET'] }))

const prisma = new PrismaClient()

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res)

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' })
  }

  const query = req.query

  const categoryFound = await prisma.category.findFirst({
    where: { id: query.id?.toString() },
  })

  if (!categoryFound) {
    return res.status(404).json({ message: 'Categoria não encontrada.' })
  }

  return res.status(200).json(categoryFound)
}
