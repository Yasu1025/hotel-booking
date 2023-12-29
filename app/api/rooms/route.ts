import { getAllRooms, createNewRoom } from '@/backend/controller/roomController'
import dbConnect from '@/backend/config/dbConnect'
import { createEdgeRouter } from 'next-connect'
import { NextRequest } from 'next/server'
import { authorizeRoles, isAuthenticatedRoute } from '@/backend/middlewares/auth'

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>()

// Connect to mongoDB
dbConnect()

router.get(getAllRooms)
router.post(createNewRoom)

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx)
}

export async function POST(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx)
}
