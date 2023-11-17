import { deleteRoom, updateRoomDetail } from '@/backend/controller/roomController'
import dbConnect from '@/backend/config/dbConnect'
import { createEdgeRouter } from 'next-connect'
import { NextRequest } from 'next/server'

interface RequestContext {
  params: { id: string }
}

const router = createEdgeRouter<NextRequest, RequestContext>()

// Connect to mongoDB
dbConnect()

router.put(updateRoomDetail)
router.delete(deleteRoom)

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx)
}
export async function DELETE(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx)
}
