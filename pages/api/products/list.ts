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

  const products = await prisma.product.findMany()

  res.setHeader('Content-Type', 'application/json; charset=UTF-8')

  return res.status(200).json(products)
}
