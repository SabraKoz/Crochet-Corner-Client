import Head from 'next/head'
import { AppWrapper } from '../context/state'
import { Box } from '@radix-ui/themes'
import Image from 'next/image'

export default function Layout({ children }) {
  return (
    <AppWrapper>
      <>
        <Head>
          <title>Crochet Corner</title>
        </Head>
        <Box style={{ position: "relative", minHeight: "100vh" }}>
          <div style={{ position: "absolute", inset: 0, zIndex: -1 }}>
            <Image 
              src='/pink-yarn.png' 
              alt="Pink Yarn" 
              fill 
              style={{ objectFit: "cover" }}
              priority 
            />
          </div>
        <main className="container">{children}</main>
        </Box>
      </>
    </AppWrapper>
  )
}
