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

  const productFound = await prisma.product.findUnique({
    where: { id: query.id?.toString() },
  })

  if (!productFound) {
    return res.status(404).json({ message: 'Produto não encontrado.' })
  }

  return res.status(200).json(productFound)
}
