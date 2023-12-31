import dbConnect from '@/backend/config/dbConnect'
import { registerUser } from '@/backend/controller/authController'
import { createEdgeRouter } from 'next-connect'
import { NextRequest } from 'next/server'

interface RequestContext {
  params: { id: string }
}

const router = createEdgeRouter<NextRequest, RequestContext>()

// Connect to mongoDB
dbConnect()

router.post(registerUser)

export async function POST(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx)
}
