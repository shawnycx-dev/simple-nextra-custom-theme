import Navbar from '@/components/navbar'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'

export default function App ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}
