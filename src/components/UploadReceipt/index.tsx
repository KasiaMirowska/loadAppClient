import { useState } from "react";
import { Grid } from "@mui/system";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { saveTransaction, uploadFile } from "../../features/redux/tranReducer";
import type { AppDispatch } from "../../features/redux/store";
import { TransactionType } from "../../features/redux/types";

export default function UploadReceipt() {
  const dispatch = useDispatch<AppDispatch>();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };
  const onFileSubmit = async () => {
    dispatch(
      saveTransaction({ receiptPresent: true, type: TransactionType.receipt })
    );
    dispatch(uploadFile(file));
  };

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <input type="file" onChange={handleFileChange} />

      <Button
        onClick={() => onFileSubmit()}
        disabled={uploading}
        variant="contained"
      >
        {uploading ? "Uploading..." : "Upload"}
      </Button>

      {message && (
        <Grid>
          <p>{message}</p>
        </Grid>
      )}
    </Grid>
  );
}
