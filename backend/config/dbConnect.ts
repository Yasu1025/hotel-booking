import mongoose from 'mongoose'

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return
  }

  const NODE_ENV = process.env.NODE_ENV
  let DB_URI: string = ''

  if (NODE_ENV === 'development') DB_URI = process.env.DB_LOCAL_URI as string
  if (NODE_ENV === 'production') DB_URI = process.env.DB_URI as string

  await mongoose.connect(DB_URI).then(con => console.log(`DB Connected to ${DB_URI}`))
}

export default dbConnect
