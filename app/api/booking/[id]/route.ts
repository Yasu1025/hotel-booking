import { getBookingDetails } from '@/backend/controller/bookingController'
import dbConnect from '@/backend/config/dbConnect'
import { isAuthenticatedRoute } from '@/backend/middlewares/auth'
import { createEdgeRouter } from 'next-connect'
import { NextRequest } from 'next/server'

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>()

dbConnect()

router.use(isAuthenticatedRoute).get(getBookingDetails)

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx)
}
