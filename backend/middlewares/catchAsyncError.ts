import { NextRequest, NextResponse } from 'next/server'

type HandlerFunc = (req: NextRequest, params: any) => Promise<NextResponse>

interface IValidationError {
  message: string
}

export const catchAsyncErrors =
  (handler: HandlerFunc) => async (req: NextRequest, params: any) => {
    try {
      return await handler(req, params)
    } catch (error: any) {
      if (error?.name === 'CastError') {
        error.message = `Resource not found... Invalid ${error.path}`
      }

      if (error?.name === 'ValidationError') {
        error.message = Object.values<IValidationError>(error.errors).map(
          val => val.message
        )
        error.statusCode = 400
      }

      // handle MongoDB duplicate key error
      if (error.code === 11000) {
        error.message = `Duplicate ${Object.keys(error.keyValue)}`
      }

      return NextResponse.json(
        {
          errMessage: error.message,
        },
        { status: error.statusCode || 500 }
      )
    }
  }
