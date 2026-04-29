import Head from 'next/head'
import { AppWrapper } from '../context/state'
import { Box } from '@radix-ui/themes'
import Image from 'next/legacy/image'

export default function Layout({ children }) {
  return (
    <AppWrapper>
      <>
        <Head>
          <title>Crochet Corner</title>
        </Head>
        <Box style={{ position: "relative", minHeight: "100vh" }}>
          <div style={{ position: "absolute", inset: 0, zIndex: -1 }}>
            <Image src='/wood.jpg' alt="Wood Texture Background" layout='fill' objectFit='cover' quality={25} priority />
          </div>
        <main className="container">{children}</main>
        </Box>
      </>
    </AppWrapper>
  )
}
