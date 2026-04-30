import { Box, Container } from '@radix-ui/themes'
import Layout from '../components/layout'
import Navbar from '../components/navbar'

export default function Index() {
  return (
    <Container>
      <Box align="center" m="9">
          <img src="/yarn logo.png" style={{ borderRadius: "50px", boxShadow: "0 0 20px black" }} />
      </Box>
    </Container>
  )
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}