import { NextRequest, NextResponse } from 'next/server'

type HandlerFunc = (req: NextRequest, params: any) => Promise<NextResponse>

export const catchAsyncErrors =
  (handler: HandlerFunc) => async (req: NextRequest, params: any) => {
    try {
      return await handler(req, params)
    } catch (error: any) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: error.statusCode }
      )
    }
  }
