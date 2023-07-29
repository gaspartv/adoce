import { decode } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

function withTokenMiddleware(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { authorization } = req.headers

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Você precisa estar logado!' })
    }

    const token = authorization.split(' ')[1]

    if (!token) {
      return res.status(400).json({ message: 'Você precisa estar logado!' })
    }

    const decoded = decode(token)

    if (!decoded) {
      return res.status(400).json({ message: 'Você precisa estar logado!' })
    }

    req.userId = String(decoded.sub)

    await handler(req, res)
  }
}

export default withTokenMiddleware
