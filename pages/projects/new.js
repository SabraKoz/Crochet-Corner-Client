import { AlertDialog, Box, Button, Card, Container, Heading, Select, Text, TextArea, TextField } from "@radix-ui/themes"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { addProject, getAllTypes, getAllLevels } from "../../data/projects";


export default function NewProject(project = {}) {
    const router = useRouter()
    const [types, setTypes] = useState([])
    const [selectedType, setSelectedType] = useState("")
    const [levels, setLevels] = useState([])
    const [selectedLevel, setSelectedLevel] = useState("")
    const [projectImage, setProjectImage] = useState(null)
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createProjectImageString = (event) => {
        if (event.target.files && event.target.files[0]) {
            getBase64(event.target.files[0], (base64ImageString) => {
                setProjectImage(base64ImageString)
            })
        }
    }

    useEffect(() => {
        getAllTypes().then(data => setTypes(data))
        getAllLevels().then(data => setLevels(data))
    }, [])

    const saveProject = () => {
        const project = {
            name: projectName.value,
            type: selectedType,
            level: selectedLevel,
            skeins: skeins.value,
            weight: weight.value,
            hook: hook.value,
            instructions: instructions.value
        }

        if (projectImage) {
            project.image_path = projectImage
        }

        if (project.name && project.type && project.level && project.skeins && project.weight && project.hook && project.instructions) {
            addProject(project).then(res => {
                router.push(`/projects/${res.id}`)
            })
        } else {setIsAlertDialogOpen(true)}
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
                }}
            >
                <Heading
                    size="8" 
                    align="center" 
                    m="5" 
                    weight="bold" 
                    style={{ textShadow: "2px 2px 3px #0882B2" }}
                >
                    Create a New Project!
                </Heading>
                <Box m="4" style={{ display: "flex", justifyContent: "center" }}>
                    <Text m="2">Project Name: </Text>
                    <TextField.Root 
                        id="projectName"
                        placeholder="Name"
                        type="text"
                        name="name"
                        value={project.projectName}
                        m="1"
                        style={{ width: "400px", backgroundColor: "#B8C0FF"}}
                    />
                </Box>
                <Box m="4" style={{ display: "flex", justifyContent: "center" }}>
                    <Text m="2">Project Type: </Text>
                    <Select.Root
                        value={selectedType}
                        onValueChange={setSelectedType}
                    >
                        <Select.Trigger 
                            placeholder="Select Type"
                            style={{ width: "400px", backgroundColor: "#B8C0FF" }} />
                        <Select.Content style={{ backgroundColor: "#B8C0FF" }}>
                            <Select.Group>
                                {types.map(type => {
                                    return (<Select.Item value={type.id} key={type.id}>{type.name}</Select.Item>)
                                })}
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </Box>
                <Box m="4" style={{ display: "flex", justifyContent: "center" }}>
                    <Text m="2">Project Level: </Text>
                    <Select.Root
                        value={selectedLevel}
                        onValueChange={setSelectedLevel}
                    >
                        <Select.Trigger 
                            placeholder="Select Level"
                            style={{ width: "400px", backgroundColor: "#B8C0FF" }} />
                        <Select.Content style={{ backgroundColor: "#B8C0FF" }}>
                            <Select.Group>
                                {levels.map(level => {
                                    return (<Select.Item value={level.id} key={level.id}>{level.name}</Select.Item>)
                                })}
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </Box>
                <Box m="4" style={{ display: "flex", justifyContent: "center" }}>
                    <Text m="2">Skeins: </Text>
                    <TextField.Root 
                        id="skeins"
                        placeholder="Skeins"
                        type="number"
                        name="skeins"
                        value={project.skeins}
                        m="1"
                        style={{ width: "400px", backgroundColor: "#B8C0FF"}}
                    />
                </Box>
                <Box m="4" style={{ display: "flex", justifyContent: "center" }}>
                    <Text m="2">Yarn Weight: </Text>
                    <TextField.Root 
                        id="weight"
                        placeholder="Weight"
                        type="number"
                        name="weight"
                        value={project.weight}
                        m="1"
                        style={{ width: "400px", backgroundColor: "#B8C0FF"}}
                    />
                </Box>
                <Box m="4" style={{ display: "flex", justifyContent: "center" }}>
                    <Text m="2">Hook Size: </Text>
                    <TextField.Root 
                        id="hook"
                        placeholder="Hook Size"
                        type="text"
                        name="hook"
                        value={project.hook}
                        m="1"
                        style={{ width: "400px", backgroundColor: "#B8C0FF"}}
                    />
                </Box>
                <Box m="4" style={{ display: "flex", justifyContent: "center" }}>
                    <Text m="2">Instructions: </Text>
                    <TextArea
                        id="instructions"
                        placeholder="Instructions"
                        type="text"
                        name="instructions"
                        value={project.instructions}
                        m="1"
                        size="3"
                        resize="vertical"
                        style={{ width: "600px", backgroundColor: "#B8C0FF"}}
                    />
                </Box>
                <Box>
                    <Text>Image: </Text>
                    <TextField.Root 
                        m="3"
                        type="file"
                        id="image_path"
                        onChange={createProjectImageString}
                        style={{ backgroundColor: "#B8C0FF" }}
                    />
                    {project.id && <TextField.Root type="hidden" name="project" value={project.id} />}
                    {projectImage && (
                        <Box>
                            <img src={projectImage} alt="project image review" style={{ maxWidth: "200px" }} />
                        </Box>
                    )}
                </Box>

                <Box m="3" align="center">
                    <Button m="4" onClick={saveProject}>Save Project</Button>
                    <Button m="4" color="red" onClick={() => router.back()}>Cancel</Button>
                </Box>

                <AlertDialog.Root open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
                    <AlertDialog.Content style={{ backgroundColor: "#B8C0FF" }}>
                        <AlertDialog.Title m="3" align="center">Missing Information</AlertDialog.Title>
                        <AlertDialog.Description m="3" align="center">Please Complete All Fields</AlertDialog.Description>
                        <Box m="3" align="center">
                            <AlertDialog.Cancel>
                                <Button onClick={() => setIsAlertDialogOpen(false)}>Continue</Button>
                            </AlertDialog.Cancel>
                        </Box>
                    </AlertDialog.Content>
                </AlertDialog.Root>

            </Card>
        </Container>
    )
}

NewProject.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar/>
            {page}
        </Layout>
    )
}