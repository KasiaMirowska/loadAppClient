import { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../features/redux/store";
import { saveTransaction } from "../../features/redux/tranReducer";
import { TransactionType } from "../../features/redux/types";
import { apiCall } from "../../features/apiCalls";

const useStyles = makeStyles(() => ({
  formBox: {
    backgroundColor: "#FFFFFF",
    outline: "1px solid #408000",
    maxWidth: "90vh",
    padding: "2em",
  },
}));
export const ManualEntry: React.FC = () => {
  const classes: any = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  let [amount, setAmount] = useState("0.00");
  let [description, setDescription] = useState("");
  let [category, setCategory] = useState("");
  let [date, setDate] = useState("");
  let [receiptPresent, setReceiptPresent] = useState(false);

  const onSubmitTranInfo = () => {
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
    setReceiptPresent(false);
  };

  return (
    <Grid container flexDirection="column">
      <Box component="form" className={classes.formBox} flexDirection="column">
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
      <Grid>
        <Button variant="contained" onClick={() => onSubmitTranInfo()}>
          Submit transaction
        </Button>
        <Button variant="contained" onClick={() => apiCall()}>
          Make API Call
        </Button>
      </Grid>
    </Grid>
  );
};
