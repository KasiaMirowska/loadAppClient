import { useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Button,
  Card,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../features/redux/store";
// import { saveTransaction } from "../../features/redux/tranReducer";
import { TransactionType } from "../../features/redux/types";
import { FormCard, MainContainer, Header } from "../../theme/containers";

const InputBox = styled(TextField)(({ theme }) => ({
  margin: "1em",
  width: "90%",
}));

export const ManualEntry: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  let [amount, setAmount] = useState("0.00");
  let [description, setDescription] = useState("");
  let [category, setCategory] = useState("");
  let [date, setDate] = useState("");
  let [receiptPresent, setReceiptPresent] = useState(false);

  const onSubmitTranInfo = () => {
    // dispatch(
    //   saveTransaction({
    //     amount,
    //     description,
    //     category,
    //     date,
    //     receiptPresent,
    //     type: TransactionType.manual,
    //   })
    // );
    setAmount("0.00");
    setDescription("");
    setCategory("");
    setDate("");
    setReceiptPresent(false);
  };

  return (
    <MainContainer>
      <FormCard>
        <Header>
          <Typography variant="h5" fontWeight="bold">
            FILL IN EXPENSE DETAILS
          </Typography>
        </Header>
        <InputBox
          id="outlined-controlled"
          label="Amount"
          value={amount}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAmount(event.target.value);
          }}
        />
        <InputBox
          id="outlined-controlled"
          label="Category"
          value={category}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCategory(event.target.value);
          }}
        />
        <InputBox
          id="outlined-controlled"
          label="Description"
          value={description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(event.target.value);
          }}
        />
        <InputBox
          id="outlined-controlled"
          label="Date"
          value={date}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDate(event.target.value);
          }}
        />
        <Box alignSelf="flex-end">
          <Button
            variant="contained"
            style={{ backgroundColor: "green" }}
            onClick={() => onSubmitTranInfo()}
          >
            Submit transaction
          </Button>
        </Box>
      </FormCard>
    </MainContainer>
  );
};
