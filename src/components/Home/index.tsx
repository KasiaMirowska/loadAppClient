import react from "react";
import Grid from "@mui/material/Grid";
import { Button, ListItem, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { selectIsExpress, selectIsNone } from "../../features/redux/selectors";
import { activeServerInfo } from "../../features/redux/servReducer";
import { ServerType } from "../../features/redux/types";

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
  const dispatch = useDispatch();
  const isNonePicked = useSelector(selectIsNone);
  const isExpressPicked = useSelector(selectIsExpress);

  const onExpressSelectServer = () => {
    dispatch(activeServerInfo(ServerType.express));
  };
  const onBack = () => {
    dispatch(activeServerInfo(ServerType.nonePicked));
  };

  return isNonePicked ? (
    <Paper className={classes.paper}>
      <Grid container flexDirection="column" justifyContent="center">
        <Typography variant="h4">
          Welcome to my basic POC react app that tracks your spending. Enter
          your transactions manually or upload your receipts to be processed and
          saved.
        </Typography>
        <br />
        <Typography>I built 2 versions of the back end:</Typography>
        <ListItem>
          • Express server deplyed in AWS, utilizing S3 backet to store receipt
          images and Firestore to store transaction data. Click the below button
          to use that server
          <Button variant="outlined" onClick={() => onExpressSelectServer()}>
            Express Server
          </Button>
        </ListItem>

        <ListItem>
          • Fully serverless backend utilizing AWS lambdas and S3 with
          transactions saved in DynamoDB . Click the below button to use that
          server
          <Button variant="outlined">Serverless solution</Button>
        </ListItem>
        <br />
        <Typography variant="h5">
          Upcoming:
          <ListItem>
            • Receipt image processing to extract transaction data
          </ListItem>
          <ListItem>• Bank account sync</ListItem>
          <ListItem>• Full spending reports</ListItem>
        </Typography>
      </Grid>
    </Paper>
  ) : isExpressPicked ? (
    <Paper className={classes.paper}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} md={11} lg={11}>
          <Typography variant="h4">
            You chose to use the Express server. Proceed to choose from the menu
            above to enter a transaction manually or upload receipts.
          </Typography>
        </Grid>
        <Grid item xs={12} md={1} lg={1}>
          <Button variant="outlined" onClick={onBack}>
            BACK
          </Button>
        </Grid>
      </Grid>
    </Paper>
  ) : (
    <Paper className={classes.paper}>
      <Grid container flexDirection="column" justifyContent="center">
        <Typography variant="h4">
          Serverless server active. Use the menu above to log transactions or
          upload receipts.
        </Typography>
        <br />
      </Grid>
    </Paper>
  );
};
