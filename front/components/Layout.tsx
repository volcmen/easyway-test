import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { ReactNode } from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: "100vw",
            maxHeight: "100vh",
            overflow: "hidden",
        },
        main: {
            overflow: "auto",
            [theme.breakpoints.down("sm")]: {
                marginTop: "10vh",
                height: "calc(90vh - 70px)",
            },
            marginTop: "15vh",
            height: "calc(85vh - 112px)",
            padding: theme.spacing(0, "8vw"),
        },
    }),
);

interface Props {
    children: ReactNode;
}

export default function Layout({ children, ...props }: Props): JSX.Element {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <main className={classes.main}>{children}</main>
        </div>
    );
}
