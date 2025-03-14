import react from "react";
import Grid from "@mui/material/Grid2";
import { Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  paper: {
    margin: "1em",
    width: "90vw",
    padding: "2em",
  },
  // { #008040, #408000 }
  // { #FF8380, #A700B0, #800400, #804000}
});

export const Home: react.FC = () => {
  const classes: any = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container flexDirection="column" justifyContent="center">
        <Typography variant="h4">
          Welcome to my basic POC react app with express server that tracks your
          spending.
        </Typography>
        <br />
        <Typography>
          Enter your transcations manually or upload your receipts to be
          processed and saved.
        </Typography>
      </Grid>
    </Paper>
  );
};
