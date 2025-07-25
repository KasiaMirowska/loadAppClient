import { useState } from "react";
import { Box, Grid, styled, type BoxProps } from "@mui/system";
import {
  Button,
  Card,
  CircularProgress,
  Typography,
  type CardProps,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { uploadReceiptImages } from "../../features/redux/tranReducer";
import type { AppDispatch } from "../../features/redux/store";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { v4 as uuidv4 } from "uuid";
import { MainContainer, Header, FormCard } from "../../theme/containers";
import theme from "../../theme";

import {
  selectReceiptDataFromDB,
  selectReceiptParsed,
  selectReceiptUpload,
} from "../../features/redux/selectors";
import { useCheckReceiptStatus } from "../../features/firebase/checkReceiptStatusHook";
import CircularWithValueLabel from "./CircularProgress";

const InputBox = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  border: "0.5px solid grey",
  transition: "box-shadow 0.3s ease",
  position: "relative",
  "&:hover": {
    backgroundColor: "rgb(236, 249, 223)",
    cursor: "pointer",
  },
  borderRadius: theme.shape.borderRadius,
}));

const HiddenInput = styled("input")({
  opacity: 0,
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
});

export default function UploadReceipt() {
  const dispatch = useDispatch<AppDispatch>();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [receiptId, setReceiptId] = useState("");

  useCheckReceiptStatus(receiptId);
  const filesUploaded = useSelector(selectReceiptUpload);
  const isParsed = useSelector(selectReceiptParsed);
  const { total, merchant, description, category, date, items, tax } =
    useSelector(selectReceiptDataFromDB);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (!selectedFiles.length) return;
    setFiles(selectedFiles);
  };

  const onFileSubmit = async () => {
    if (!files.length) return;
    setUploading(true);
    try {
      const receiptId = uuidv4();
      setReceiptId(receiptId);
      await dispatch(uploadReceiptImages({ files, receiptId }));
      setFiles([]);
    } catch (e) {
      console.error("Upload failed:", e);
    } finally {
      setUploading(false);
    }
  };

  return (
    <MainContainer>
      {!filesUploaded && (
        <FormCard>
          <Header>
            <Typography variant="h5" fontWeight="bold">
              UPLOAD YOUR RECEIPT JPG
            </Typography>
          </Header>
          <InputBox container flexDirection="row" alignItems="center">
            <FileUploadIcon />
            <HiddenInput
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            <Typography variant="body2" marginLeft={1}>
              {files.length
                ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
                : "Click box to upload"}
            </Typography>
          </InputBox>
          <Box alignSelf="flex-end" sx={{ margin: theme.spacing(2) }}>
            <Button
              onClick={onFileSubmit}
              disabled={uploading || !files.length}
              variant="contained"
              style={{ backgroundColor: "green", color: "white" }}
            >
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </Box>
        </FormCard>
      )}
      {filesUploaded && (
        <FormCard>
          {isParsed ? (
            <Box alignSelf="center">
              <Header>
                <Typography variant="h5" fontWeight="bold">
                  Data saved in records:
                </Typography>
              </Header>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "left",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  padding: theme.spacing(2),
                }}
              >
                <Typography>{`${merchant}`}</Typography>
                <Typography>{`Category: ${category}`}</Typography>
                <Typography>{`Total: $${total}`}</Typography>
                <Typography>{`Tax: $${tax}`}</Typography>
                {items.map((item) => {
                  return (
                    <Typography
                      key={item.name}
                    >{`${item.quantity} x ${item.name}.   $${item.price}`}</Typography>
                  );
                })}
              </Box>
            </Box>
          ) : (
            <Box
              alignSelf="center"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <CircularWithValueLabel />
              <Header>
                <Typography variant="h5" fontWeight="bold">
                  Processing and saving receipt
                </Typography>
              </Header>
            </Box>
          )}
        </FormCard>
      )}
    </MainContainer>
  );
}
