import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/state";
import { getUserProfile } from "../../data/auth";
import { Container, Card, Grid, Heading } from "@radix-ui/themes";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { ProjectCard } from "../../components/ProjectCard";

export default function Profile() {
    const router = useRouter()
    const { profile } = useAppContext()
    const [projects, setProjects] = useState([])

    useEffect(() => {
        getUserProfile().then(data => {
            setProjects(data.projects)
        })
    }, [])

    return (
        <Container m="7">
            <Card 
                m="5" 
                style={{ 
                    padding: "20px", 
                    backgroundColor: "#C4E8F6", 
                    borderRadius: "10px", 
                    boxShadow: "0 0 20px black" 
                }}>
                <Heading 
                    m="5" 
                    align="center" 
                    size="8" 
                    weight="bold" 
                    style={{ textShadow: "2px 2px 3px #0882B2" }}
                >
                    {profile.first_name}'s Projects
                </Heading>
                <Grid columns="3" gap="4">
                    {projects.map(project => (
                        <ProjectCard project={project} key={project.id} img_src={project.image_path} />
                    ))}
                </Grid>
            </Card>
        </Container>
    )
}

Profile.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar />
            {page}
        </Layout>
    )
}