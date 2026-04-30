import { AlertDialog, Box, Button, Card, Heading, Inset } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/router";


export function ProjectCard({ project, removeProject, img_src, noButtons, isOwner = false }) {

    const router = useRouter()

    return (
        <Card m="2" style={{
            backgroundColor: "#B8C0FF",
            transition: "transform 0.3s ease, box-shadow 0.3s ease"
        }}
            onMouseEnter={(event) => {
                event.currentTarget.style.transform = "scale(1.01)";
                event.currentTarget.style.boxShadow = "0px 0px 20px #0882B2"
            }}
            onMouseLeave={(event) => {
                event.currentTarget.style.transform = "scale(1)";
                event.currentTarget.style.boxShadow = "none"
            }}
        >
            <Inset clip="padding-box" side="top">
                <img src={img_src} style={{ width: "100%", height: "200px", objectFit: "cover", objectPosition: "center" }} />
            </Inset>
            <Heading mt="2" size="4"><Link href={`/projects/${project.id}`} style={{ textDecoration: "none", color: "inherit" }}>{project.name}</Link></Heading>
            <Box>
                {isOwner && !noButtons ?
                    <Box>
                        <Button m="3" onClick={() => router.push(`/projects/${project.id}/edit`)}>Edit</Button>
                        <AlertDialog.Root align="center">
                            <AlertDialog.Trigger>
                                <Button m="3" color="red">Delete</Button>
                            </AlertDialog.Trigger>
                            <AlertDialog.Content style={{ backgroundColor: "#B8C0FF"}}>
                                <AlertDialog.Title align="center" m="3">Delete Project</AlertDialog.Title>
                                <AlertDialog.Description align="center" m="3">Are you sure you want to permanently delete "{project.name}"?</AlertDialog.Description>
                                <Box align="center">
                                    <AlertDialog.Action>
                                        <Button m="3" color="red" onClick={() => removeProject(project.id)}>Delete</Button>
                                    </AlertDialog.Action>
                                    <AlertDialog.Cancel>
                                        <Button m="3">Cancel</Button>
                                    </AlertDialog.Cancel>
                                </Box>
                            </AlertDialog.Content>
                        </AlertDialog.Root>
                    </Box> : <></>}
            </Box>
        </Card>
    )
}