import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Button, Card, Container, Heading, Select, Text, TextArea, TextField } from "@radix-ui/themes";
import Layout from "../../../components/layout";
import Navbar from "../../../components/navbar";
import { editProject, getAllLevels, getAllTypes, getProjectById } from "../../../data/projects";

export default function EditProject() {
    const router = useRouter()
    const { id } = router.query

    const [project, setProject] = useState({})
    const [projectImage, setProjectImage] = useState(null)

    const [types, setTypes] = useState([])
    const [levels, setLevels] = useState([])

    const [selectedType, setSelectedType] = useState("")
    const [selectedLevel, setSelectedLevel] = useState("")

    useEffect(() => {
        if (id) {
            getProjectById(id).then(data => {
                setProject({
                    name: data.name || "",
                    type: data.type?.id || "",
                    level: data.level?.id || "",
                    skeins: data.skeins || "",
                    weight: data.weight || "",
                    hook: data.hook || "",
                    instructions: data.instructions || "",
                    image_path: data.image_path || ""
                })

                setSelectedType(data.type?.id || "")
                setSelectedLevel(data.level?.id || "")
            })
        }
    }, [id])

    useEffect(() => {
        getAllTypes().then(typeData => setTypes(typeData))
        getAllLevels().then(levelData => setLevels(levelData))
    }, [])

    const getBase64 = (file, callback) => {
        const reader = new FileReader()
        reader.addEventListener("load", () => callback(reader.result))
        reader.readAsDataURL(file)
    }

    const createProjectImageString = (event) => {
        if (event.target.files && event.target.files[0]) {
            getBase64(event.target.files[0], (base64ImageString) => {
                setProjectImage(base64ImageString)
            })
        }
    }

    const updateProject = () => {
        const updatedProject = {
            name: project.name,
            type: selectedType,
            level: selectedLevel,
            skeins: project.skeins,
            weight: project.weight,
            hook: project.hook,
            instructions: project.instructions,
            image_path: projectImage || project.image_path
        }

        editProject(id, updatedProject).then(() => {
            router.push(`/projects/${id}`)
        })
    }

    return (
        <Container>
            <Card
                m="5"
                style={{
                    padding: "20px",
                    backgroundColor: "#C4E8F6",
                    borderRadius: "20px",
                    boxShadow: "0 0 20px black"
                }}>
                <Heading
                    size="8"
                    align="center"
                    m="5"
                    weight="bold"
                    style={{
                        textShadow: "2px 2px 3px #0882B2"
                    }}
                >
                    Edit Project
                </Heading>
                <Box
                    m="4"
                    style={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Text m="2">Project Name: </Text>
                    <TextField.Root
                        id="projectName"
                        placeholder="Name"
                        type="text"
                        name="name"
                        value={project?.name || ""}
                        onChange={(e) => setProject(prev => ({ ...prev, name: e.target.value }))}
                        m="1"
                        style={{ width: "400px", backgroundColor: "#B8C0FF" }} />
                </Box>
                <Box
                    m="4"
                    style={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Text m="2">Project Type: </Text>
                    <Select.Root
                        value={selectedType}
                        onValueChange={setSelectedType}
                    >
                        <Select.Trigger style={{ width: "400px", backgroundColor: "#B8C0FF" }} />
                        <Select.Content style={{ backgroundColor: "#B8C0FF" }}>
                            <Select.Group>
                                {types.map(type => {
                                    return (<Select.Item value={type.id} key={type.id} >{type.name}</Select.Item>)
                                })}
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </Box>
                <Box
                    m="4"
                    style={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Text m="2">Project Level: </Text>
                    <Select.Root
                        value={selectedLevel}
                        onValueChange={setSelectedLevel}
                    >
                        <Select.Trigger style={{ width: "400px", backgroundColor: "#B8C0FF" }} />
                        <Select.Content style={{ backgroundColor: "#B8C0FF" }}>
                            <Select.Group>
                                {levels.map(level => {
                                    return (<Select.Item value={level.id} key={level.id} >{level.name}</Select.Item>)
                                })}
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </Box>
                <Box
                    m="4"
                    style={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Text m="2">Skeins: </Text>
                    <TextField.Root
                        id="skeins"
                        placeholder="Skeins"
                        type="number"
                        name="skeins"
                        value={project?.skeins || ""}
                        onChange={(e) => setProject(prev => ({ ...prev, skeins: e.target.value }))}
                        m="1"
                        style={{ width: "400px", backgroundColor: "#B8C0FF" }} />
                </Box>
                <Box
                    m="4"
                    style={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Text m="2">Yarn Weight: </Text>
                    <TextField.Root
                        id="weight"
                        placeholder="Yarn Weight"
                        type="number"
                        name="weight"
                        value={project?.weight || ""}
                        onChange={(e) => setProject(prev => ({ ...prev, weight: e.target.value }))}
                        m="1"
                        style={{ width: "400px", backgroundColor: "#B8C0FF" }} />
                </Box>
                <Box
                    m="4"
                    style={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Text m="2">Hook Size: </Text>
                    <TextField.Root
                        id="hook"
                        placeholder="Hook Size"
                        type="text"
                        name="hook"
                        value={project?.hook || ""}
                        onChange={(e) => setProject(prev => ({ ...prev, hook: e.target.value }))}
                        m="1"
                        style={{ width: "400px", backgroundColor: "#B8C0FF" }} />
                </Box>
                <Box
                    m="4"
                    style={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Text m="2">Instructions: </Text>
                    <TextArea
                        id="instructions"
                        placeholder="Instructions"
                        type="text"
                        name="instructions"
                        value={project?.instructions || ""}
                        onChange={(e) => setProject(prev => ({ ...prev, instructions: e.target.value }))}
                        m="1"
                        size="3"
                        resize="vertical"
                        style={{ width: "600px", backgroundColor: "#B8C0FF" }} />
                </Box>
                <Box m="3">
                    <Text>Image: </Text>
                    <TextField.Root 
                        m="3"
                        type="file"
                        id="image_path"
                        onChange={createProjectImageString}
                        style={{
                            backgroundColor: "#B8C0FF"
                        }}
                    />
                    {project.id && <TextField.Root type="hidden" name="project" value={project.id} />}
                    {projectImage && (
                        <Box m="2">
                            <img src={projectImage} alt="project image preview" style={{ maxWidth: "200px" }} />
                        </Box>
                    )}
                </Box>

                <Box m="3" align="center">
                    <Button m="4" onClick={updateProject}>Save</Button>
                    <Button m="4" color="red" onClick={() => router.back()}>Cancel</Button>
                </Box>

            </Card>
        </Container>
    )
}

EditProject.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar/>
            {page}
        </Layout>
    )
}