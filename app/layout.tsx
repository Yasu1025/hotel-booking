import 'bootstrap/dist/css/bootstrap.css'

import './globals.css'
import { Inter } from 'next/font/google'
import Head from './head'
import { GlobalProvider } from './GlobalProvider'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <Head />
      <body className={inter.className}>
        <GlobalProvider>{children}</GlobalProvider>
        <Script src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js'></Script>
      </body>
    </html>
  )
}
