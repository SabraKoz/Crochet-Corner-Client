import { Box, Card, Container, Flex, Grid, Heading, Select, Text } from "@radix-ui/themes";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { useEffect, useState } from "react";
import { getAllLevels, getAllProjects, getAllTypes } from "../../data/projects";
import { ProjectCard } from "../../components/ProjectCard";

export default function Projects() {
    const [projects, setProjects] = useState([])
    const [types, setTypes] = useState([])
    const [levels, setLevels] = useState([])
    const [selectedType, setSelectedType] = useState("")
    const [selectedLevel, setSelectedLevel] = useState("")

    useEffect(() => {
        getAllTypes().then((typeData) => {
            setTypes(typeData)
        })

        getAllLevels().then((levelData) => {
            setLevels(levelData)
        })

        let query = ""

        if (selectedType) {
            query += `?type=${selectedType}`
        }

        if (selectedLevel) {
            query += selectedType ? `&level=${selectedLevel}` : `?level=${selectedLevel}`
        }

        if (query) {
            fetch(`http://localhost:8000/projects${query}`)
                .then(res => res.json())
                .then(data => setProjects(data))
        } else {
            getAllProjects().then(data => {
                setProjects(data)
            })
        }
    }, [selectedType, selectedLevel])

    return (
          <Container>
            <Card m="5" style={{ padding: "20px", backgroundColor: "#C4E8F6", borderRadius: "10px", boxShadow: "0 0 20px black" }}>
            <Heading m="5" align="center" size="8" weight="bold" style={{ textShadow: "2px 2px 3px #0882B2" }}>Crochet Corner Projects</Heading>
            <Flex justify="between" align="center" m="7">
                <Box>
                    <Text size="4" weight="medium" m="3">Filter by Project Type: </Text>
                    <Select.Root defaultValue="all" onValueChange={(value) => setSelectedType(value === "all" ? null : value)} >
                        <Select.Trigger style={{backgroundColor: "#B8C0FF"}}>
                            {selectedType ? types.find(type => type.id === selectedType)?.name : "Select a type"}
                        </Select.Trigger>
                        <Select.Content style={{backgroundColor: "#B8C0FF"}}>
                            <Select.Group >
                                <Select.Item value="all" >Select a Type</Select.Item>
                                {types.map(type => (
                                    <Select.Item key={type.id} value={type.id}>
                                        {type.name}
                                    </Select.Item>
                                ))}
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </Box>
                <Box>
                    <Text size="4" weight="medium" m="3" >Filter by Project Level: </Text>
                    <Select.Root defaultValue="all" onValueChange={(value) => setSelectedLevel(value === "all" ? null : value)}>
                        <Select.Trigger style={{backgroundColor: "#B8C0FF"}}>
                            {selectedLevel ? levels.find(level => level.id === selectedLevel)?.name : "Select a level"}
                        </Select.Trigger>
                        <Select.Content style={{backgroundColor: "#B8C0FF"}}>
                            <Select.Group>
                                <Select.Item value="all">Select a Level</Select.Item>
                                {levels.map(level => (
                                    <Select.Item key={level.id} value={level.id}>
                                        {level.name}
                                    </Select.Item>
                                ))}
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </Box>
            </Flex>
            <Grid columns="4" gap="3">
                {projects.map(project => (
                    <ProjectCard project={project} key={project.id} img_src={project.image_path} />
                ))}
            </Grid>
            </Card>
        </Container>
    )
}

Projects.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar/>
            {page}
        </Layout>
    )
}
