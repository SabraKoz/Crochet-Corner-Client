import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useAppContext } from '../context/state'
import { login } from '../data/auth'
import { AlertDialog, Box, Button, Container, Heading, Text, TextField } from '@radix-ui/themes'

export default function Login() {
    const { setToken } = useAppContext()
    const username = useRef('')
    const password = useRef('')
    const router = useRouter()
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

    const submit = (e) => {
        e.preventDefault()
        const user = {
            username: username.current.value,
            password: password.current.value,
        }

        if (user.username && user.password) {
        login(user).then((res) => {
            setToken(res.token)
            router.push('/')
        })
    } else {setIsAlertDialogOpen(true)}
    }

    return (
        <Container m="7">
            <Box m="7" style={{ padding: "20px", borderRadius: "20px", boxShadow: "0 0 20px black", backgroundColor: "#C4E8F6" }}>
                <form>
                    <Heading size="8" align="center" m="5" weight="bold" style={{ textShadow: "2px 2px 3px #0882B2" }}>Welcome Back to Crochet Corner!</Heading>
                    <Box m="4" style={{ display: "flex", justifyContent: "center" }}>
                        <Text m="2">Username: </Text>
                        <TextField.Root
                            m="1"
                            style={{ width: "400px", backgroundColor: "#e8daf0" }}
                            id="username"
                            placeholder="Username"
                            ref={username}
                            type="username"
                            label="Username"
                            required
                            autoFocus
                        />
                    </Box>
                    <Box m="4" style={{ display: "flex", justifyContent: "center" }}>
                        <Text m="2">Password: </Text>
                        <TextField.Root
                            m="1"
                            style={{ width: "400px", backgroundColor: "#e8daf0" }}
                            id="password"
                            placeholder="Password"
                            ref={password}
                            type="password"
                            label="Password"
                            required
                            autoFocus
                        />
                    </Box>
                    <Box>
                        <Box m="3" style={{ display: "flex", justifyContent: "center" }} >
                            <Button m="3" onClick={submit}>Log In</Button>
                        </Box>
                    </Box>
                </form>

                <AlertDialog.Root open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
                    <AlertDialog.Content style={{ backgroundColor: "#e8daf0" }}>
                        <AlertDialog.Title m="3" align="center">Missing Information</AlertDialog.Title>
                        <AlertDialog.Description m="3" align="center">Please Complete all fields</AlertDialog.Description>
                        <Box align="center" m="3">
                            <AlertDialog.Cancel>
                                <Button onClick={() => setIsAlertDialogOpen(false)} >Continue</Button>
                            </AlertDialog.Cancel>
                        </Box>
                    </AlertDialog.Content>
                </AlertDialog.Root>

            </Box>
        </Container>
    )
}

Login.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar />
            {page}
        </Layout>
    )
}