import { Box, Button, Card, Text, TextArea } from "@radix-ui/themes"
import { useState } from "react"
import { FaTrash } from "react-icons/fa"
import { useAppContext } from "../context/state"

export default function Comments({ project, refresh }) {
    const { profile } = useAppContext()
    const [newComment, setNewComment] = useState("")

    const saveComment = () => {
        const commentObj = {
            comment: newComment
        }

        commentProject(project.id, commentObj).then(() => {
            setNewComment("")
            refresh()
        })
    }

    const removeComment = () => {
        deleteComment(project.id).then(() => {
            refresh()
        })
    }

    return (
        <Box m="9" style={{ padding: "30px", border: "2px solid #0882B2", borderRadius: "10px", backgroundColor: "#e8daf0" }}>
            <Text weight="bold" size="4">Comments:</Text>
            <Box m="2">
                <TextArea
                    id="comment"
                    placeholder="write comment..."
                    type="text"
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}
                     />
                <Button onClick={saveComment} m="2" disabled={!newComment.trim()} >Post Comment</Button>
            </Box>
            {project.comments?.map(comment => (
                        <Card key={comment.id} m="2" style={{ border: "1px solid #0882B2", backgroundColor: "#C4E8F6" }}>
                            <Box style={{ display: "flex", justifyContent: "space-between" }}><Text weight="medium">{comment.user?.username}</Text></Box>
                            <Box m="2">"{comment.comment}"</Box>
                            {comment.user?.id === profile?.id && (
                                <Button onClick={() => removeComment()} style={{ position: "absolute", right: "25px", top: "25px", backgroundColor: "red" }}><FaTrash /></Button>
                            )}
                        </Card>
                    ))}
        </Box>
    )
}