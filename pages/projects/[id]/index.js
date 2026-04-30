import { Box, Button, Card, Container, Dialog, Flex, Heading, HoverCard, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProjectById, likeProject, unlikeProject } from "../../../data/projects";
import Layout from "../../../components/layout";
import Navbar from "../../../components/navbar";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Comments from "../../../components/Comments";

export default function ProjectDetail() {
    const router = useRouter()
    const { id } = router.query
    const [project, setProject] = useState({})

    const refresh = () => {
        getProjectById(id).then(data => {
            if (data) {
                setProject(data)
            }
        })
    }

    useEffect(() => {
        if (id) {
            refresh()
        }
    }, [id])

    const like = () => {
        likeProject(id).then(refresh)
    }

    const unlike = () => {
        unlikeProject(id).then(refresh)
    }

    return (
        <Container>
            <Card m="5" style={{ padding: "20px", backgroundColor: "#C4E8F6", borderRadius: "10px", boxShadow: "0 0 20px black" }}>
                <Heading 
                    m="5" 
                    align="center" 
                    size="8" 
                    weight="bold" 
                    style={{ textShadow: "2px 2px 3px #0882B2" }}>
                        {project.name}
                </Heading>
                <Flex justify="between" m="5">
                <Box m="3">
                    <Text weight="bold">Creator: </Text>
                    <HoverCard.Root>
                        <HoverCard.Trigger>
                            <Link href={`/projects/${project.user?.id}`} style={{ textDecoration: "none", color: "teal", fontWeight: "bold" }}>{project.user?.username}</Link>
                        </HoverCard.Trigger>
                        <HoverCard.Content size="1" style={{ backgroundColor: "#B8C0FF" }}>
                            <Text>View Store</Text>
                        </HoverCard.Content>
                    </HoverCard.Root>
                </Box>
             
                <Box m="3">
                    <Text weight="bold">Likes: </Text>
                    {project.likes?.length}
                </Box>
               
                {
                    project.is_liked ? 
                        <Button onClick={unlike}><FaHeart /></Button>
                        :
                        <Button onClick={like}><FaRegHeart /></Button>
                }
 
                </Flex>
             
                <Box m="5" style={{ textAlign: "center" }}>
                    <img
                        src={project.image_path}
                        alt={project.name}
                        style={{
                            width: "100%",
                            maxWidth: "700px",
                            height: "auto",
                            borderRadius: "15px",
                            boxShadow: "0 0 15px #0882B2"
                        }} 
                    />
                </Box>
                <Box m="5" p="5" style={{ backgroundColor: "#B8C0FF", border: "2px solid #0882B2", borderRadius: "10px", fontSize: "1.1rem", lineHeight: "1.6", whiteSpace: "pre-line" }}>
                    <Text weight="bold" size="4">Instructions: </Text><br /><br />
                    {project.instructions}
                </Box>
                <Box>
                    <Comments project={project} refresh={refresh} />
                </Box>
            </Card>
        </Container>
    )
}

ProjectDetail.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar />
            {page}
        </Layout>
    )
}