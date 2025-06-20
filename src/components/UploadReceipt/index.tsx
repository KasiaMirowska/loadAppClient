import { Fragment, useState } from "react";
import { Box, Grid } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  saveTransaction,
  uploadReceiptImages,
} from "../../features/redux/tranReducer";
import type { AppDispatch } from "../../features/redux/store";
import { TransactionType } from "../../features/redux/types";
import { makeStyles } from "@mui/styles";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles(() => ({
  formBox: {
    backgroundColor: "#FFFFFF",
    maxWidth: "90vh",
    padding: "2em",
    margin: "2em",
  },
  inputBox: {
    padding: "1em",
    border: "0.5px solid #408000",
    transition: "box-shadow 0.3s ease",
    position: "relative",

    "&:hover": {
      backgroundColor: "rgb(236, 249, 223)",
      cursor: "pointer",
    },
  },
  input: {
    opacity: "0",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
}));

export default function UploadReceipt() {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (!selectedFiles.length) return;
    setFiles(selectedFiles);
  };

  const onFileSubmit = async () => {
    if (!files.length) return;

    setUploading(true);
    try {
      // Save transaction metadata
      // dispatch(
      //   saveTransaction({
      //     receiptPresent: true,
      //     type: TransactionType.receipt,
      //     uploadedFileName: files.map((f) => f.name).join(", "),
      //   })
      // );
      const receiptId = uuidv4();
      // Dispatch the multi-upload thunk
      await dispatch(uploadReceiptImages({ files, receiptId }));
      console.log("running uploading thunk");
      setFiles([]);
    } catch (e) {
      console.error("Upload failed:", e);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box component="form" className={classes.formBox} flexDirection="column">
      <Grid container direction="column" alignItems="flex-end" spacing={2}>
        <Grid
          container
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          className={classes.inputBox}
        >
          <FileUploadIcon />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className={classes.input}
          />
          <Typography variant="body2">
            {files.length
              ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
              : "Click box to upload"}
          </Typography>
        </Grid>

        <Button
          onClick={onFileSubmit}
          disabled={uploading || !files.length}
          variant="contained"
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </Grid>
    </Box>
  );
}
