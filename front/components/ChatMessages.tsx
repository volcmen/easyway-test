import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            maxHeight: "80vh",
            overflow: "auto",
        },
        card: {
            width: "20vw",
        },
        media: {
            height: 150,
        },
    }),
);

interface Props {
    messages: any[];
}

export default function ChatMessages({ messages }: Props) {
    const classes = useStyles();

    return (
        <Box
            className={classes.root}
            display="flex"
            flexDirection="column"
            p={1}
            m={1}>
            {messages.map((msg, idx) => (
                <Box
                    p={1}
                    key={idx}
                    {...(msg.ownedByCurrentUser && { alignSelf: "flex-end" })}>
                    <Card className={classes.card}>
                        {msg.body.image && (
                            <CardMedia
                                className={classes.media}
                                image={msg.body.image}
                            />
                        )}
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2">
                                username: {msg.body.username}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p">
                                {msg.body.message}
                            </Typography>
                            {msg.ownedByCurrentUser && <StarIcon />}
                        </CardContent>
                    </Card>
                </Box>
            ))}
        </Box>
    );
}
