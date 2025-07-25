import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { ManualEntry } from "./components/ManualEntry";
import UploadReceipt from "./components/UploadReceipt";
import { BankSync } from "./components/BankSync";
import { Navbar } from "./components/Navbar";

import { Box, Typography, ThemeProvider } from "@mui/material";
import { styled } from "@mui/material/styles";

const AppContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  width: "100vw",
  backgroundColor: "#f0f6eb",
  display: "flex",
  flexDirection: "column",
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#789696",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  length: "100vw",
  padding: theme.spacing(4, 4, 0, 4),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4),
  },
}));

const AppTitle = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontWeight: "bold",
  fontSize: "2.5rem",
}));

function App() {
  return (
    <AppContainer>
      <HeaderContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <AppTitle>COST TRACKER</AppTitle>
          <Navbar />
        </Box>
      </HeaderContainer>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manualEntry" element={<ManualEntry />} />
        <Route path="/uploadReceipts" element={<UploadReceipt />} />
        <Route path="/syncBankTransactions" element={<BankSync />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
