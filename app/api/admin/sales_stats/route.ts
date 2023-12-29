import { deleteRoom, updateRoomDetail } from '@/backend/controller/roomController'
import dbConnect from '@/backend/config/dbConnect'
import { createEdgeRouter } from 'next-connect'
import { NextRequest } from 'next/server'
import { getSalesStats } from '@/backend/controller/bookingController'
import { authorizeRoles, isAuthenticatedRoute } from '@/backend/middlewares/auth'

interface RequestContext {
  params: { id: string }
}

const router = createEdgeRouter<NextRequest, RequestContext>()

// Connect to mongoDB
dbConnect()

router.use(isAuthenticatedRoute, authorizeRoles('admin')).get(getSalesStats)

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx)
}
