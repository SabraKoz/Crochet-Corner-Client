import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import Navbar from "../../../components/navbar";
import { Container, Card, Grid, Heading } from "@radix-ui/themes";
import { ProjectCard } from "../../../components/ProjectCard";
import { getProfileById } from "../../../data/auth";
import { useAppContext } from "../../../context/state";
import { deleteProject } from "../../../data/projects";

export default function UserProfile() {
    const router = useRouter()
    const { id } = router.query
    const { profile: loggedInUser } = useAppContext()
    const [creatorProfile, setCreatorProfile] = useState(null)
    const [isOwner, setIsOwner] = useState(false)

    const refresh = () => {
        getProfileById(id).then(data => {
            setCreatorProfile(data)
        })
    }

    useEffect(() => {
        if (!id || !loggedInUser) return
        getProfileById(id).then(data => {
            setCreatorProfile(data)
            setIsOwner(loggedInUser.id === data.id)
        })
    }, [id, loggedInUser])

    const removeProject = (projectId) => {
        deleteProject(projectId).then(refresh)
    }

    if (!creatorProfile) return null

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
                    {creatorProfile.first_name}'s Projects
                </Heading>
                <Grid
                    columns="3"
                    gap="4"
                >
                    {creatorProfile.projects.map(project => (
                        <ProjectCard 
                            project={project} 
                            key={project.id} 
                            isOwner={isOwner}
                            img_src={project.image_path}
                            removeProject={removeProject} />
                    ))}
                </Grid>
            </Card>
        </Container>
    )
}

UserProfile.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar />
            {page}
        </Layout>
    )
}