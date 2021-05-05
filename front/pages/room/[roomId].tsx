import ChatMessages from "@components/ChatMessages";
import useChat from "@lib/socket";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ImageIcon from "@material-ui/icons/Image";
import SendIcon from "@material-ui/icons/Send";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
    }),
);

export default function Room(): JSX.Element {
    const classes = useStyles();

    const router = useRouter();
    const { roomId }: { roomId: string } = router.query;

    const [message, setMessage] = useState("");
    const [uplImage, setUplImage] = useState<string | ArrayBuffer | null>();
    const [username, setUsername] = useState("");

    useEffect(() => {
        const usrName = localStorage.getItem("username");

        if (!usrName) {
            router.push("/");
        }

        setUsername(usrName);
    }, []);

    const socket = useChat(roomId, username);

    const handleChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleAttachImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files.length) {
            return;
        }
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setUplImage(reader.result);
        };
        reader.onerror = (error) => {
            console.error(error);
        };
    };

    const handleSend = () => {
        socket.sendMessage(message, uplImage);

        setMessage("");
        setUplImage(null);
    };

    return (
        <Container className={classes.root}>
            <Typography variant="h2">Username: {username}</Typography>

            <ChatMessages messages={socket.messages} />

            <TextField
                label="Message"
                onChange={handleChangeMessage}
                value={message}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton component="label">
                                <ImageIcon />
                                <input
                                    hidden
                                    type="file"
                                    name="userImage"
                                    accept="image/*"
                                    onChange={handleAttachImage}
                                />
                            </IconButton>

                            <IconButton
                                onClick={handleSend}
                                disabled={!message}>
                                <SendIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Container>
    );
}
