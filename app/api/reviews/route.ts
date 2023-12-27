import { createRoomReview } from '@/backend/controller/roomController'
import dbConnect from '@/backend/config/dbConnect'
import { createEdgeRouter } from 'next-connect'
import { NextRequest } from 'next/server'
import { isAuthenticatedRoute } from '@/backend/middlewares/auth'

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>()

// Connect to mongoDB
dbConnect()

router.use(isAuthenticatedRoute).put(createRoomReview)

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx)
}
