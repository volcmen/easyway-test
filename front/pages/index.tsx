import Layout from "@components/Layout";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flexCont: {
            placeItems: "center",
            display: "flex",
            textAlign: "center",
            flexDirection: "column",
        },
    }),
);

export default function Home(): JSX.Element {
    const classes = useStyles();

    const router = useRouter();

    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");

    const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleChangeRoomId = (event: ChangeEvent<HTMLInputElement>) => {
        setRoomId(event.target.value);
    };

    const handleClickGo = () => {
        // setShowAboutUs(false);
        localStorage.setItem("username", username);

        router.push("/room/[roomId]", `/room/${roomId}`);
    };

    const btnIsDisabled = !(username && roomId);

    return (
        <Layout>
            <Container className={classes.flexCont}>
                <TextField
                    required
                    label="Username"
                    defaultValue={username}
                    onChange={handleChangeUsername}
                />
                <TextField
                    required
                    label="Room id"
                    defaultValue={roomId}
                    onChange={handleChangeRoomId}
                />
                <Button disabled={btnIsDisabled} onClick={handleClickGo}>
                    Go
                </Button>
            </Container>
        </Layout>
    );
}
