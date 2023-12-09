import { isAuthenticatedRoute } from '@/backend/middlewares/auth'
import dbConnect from '@/backend/config/dbConnect'
import { createEdgeRouter } from 'next-connect'
import { NextRequest } from 'next/server'
import { updatePassword } from '@/backend/controller/authController'

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>()

// Connect to mongoDB
dbConnect()

router.use(isAuthenticatedRoute).put(updatePassword)

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx)
}
