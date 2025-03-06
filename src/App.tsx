import Grid from "@mui/material/Grid2";
import "./App.css";
import { Box, Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { apiCall } from "./components/apiCalls";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  saveTransaction,
  TransactionType,
} from "./components/redux/tranReducer";
import type { AppDispatch } from "./components/redux/store";
import UploadComponent from "./components/FileUploader";

const useStyles = makeStyles({
  app: {
    minHeight: "100vh",
    backgroundColor: "#FAFFFF",
    minWidth: "100vh",
  },
  appHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "#008000",
  },
  // { #008040, #408000 }
  // { #FF8380, #A700B0, #800400, #804000}
  formBox: {
    backgroundColor: "#FFFFFF",
    outline: "1px solid #408000",
    maxWidth: "90vh",
    padding: "2em",
  },
});

function App() {
  const classes: any = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  let [amount, setAmount] = useState("0.00");
  let [description, setDescription] = useState("");
  let [category, setCategory] = useState("");
  let [date, setDate] = useState("");
  let [receiptPresent, setReceiptPresent] = useState(false);

  const onSubmitTranInfo = () => {
    console.log(
      "about to click",
      amount,
      description,
      category,
      date,
      receiptPresent
    );
    // testDocInput();
    dispatch(
      saveTransaction({
        amount,
        description,
        category,
        date,
        receiptPresent,
        type: TransactionType.manual,
      })
    );
    setAmount("0.00");
    setDescription("");
    setCategory("");
    setDate("");
  };
  return (
    <Grid
      container
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      className={classes.app}
    >
      <Grid container flexDirection="column">
        <header className={classes.appHeader}>FILE LOADER</header>
      </Grid>
      <Grid container flexDirection="column">
        <Box component="form" className={classes.formBox}>
          <TextField
            id="outlined-controlled"
            label="Amount"
            value={amount}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setAmount(event.target.value);
            }}
          />
          <TextField
            id="outlined-controlled"
            label="Category"
            value={category}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCategory(event.target.value);
            }}
          />
          <TextField
            id="outlined-controlled"
            label="Description"
            value={description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDescription(event.target.value);
            }}
          />
          <TextField
            id="outlined-controlled"
            label="Date"
            value={date}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDate(event.target.value);
            }}
          />
        </Box>
      </Grid>
      <Grid>
        <Button variant="contained" onClick={() => onSubmitTranInfo()}>
          Submit transaction
        </Button>
        <Button variant="contained" onClick={() => apiCall()}>
          Make API Call
        </Button>

        <UploadComponent />
      </Grid>
    </Grid>
  );
}

export default App;
