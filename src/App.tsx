import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { ManualEntry } from "./components/ManualEntry";
import UploadReceipt from "./components/UploadReceipt";
import { BankSync } from "./components/BankSync";
import { Navbar } from "./components/Navbar";
import Grid from "@mui/material/Grid2";
import {
  AppBar,
  Box,
  createTheme,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#789696",
    },
  },
});
const useStyles = makeStyles({
  app: {
    height: "100vh", // Ensures full viewport height
    width: "100vw",
    backgroundColor: "#cadbdb",
    flexDirection: "column",
  },
  appHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "100vw",
  },
  paper: {
    padding: "1em",
  },

  // { #008040, #408000 , #789696}
  // { #FF8380, #A700B0, #800400, #804000}
});

function App() {
  const classes: any = useStyles();
  return (
    <Box className={classes.app}>
      {/* <Box sx={{ flexGrow: 1 }}> */}
      <AppBar
        position="static"
        sx={{ backgroundColor: "#008000" }}
        className={classes.appHeader}
      >
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, fontStyle: "bold" }}>
            COST TRACKER
          </Typography>
        </Toolbar>
        <Navbar />
      </AppBar>
      <Grid
        container
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manualEntry" element={<ManualEntry />} />
          <Route path="/uploadReceipt" element={<UploadReceipt />} />
          <Route path="/syncBankTransactions" element={<BankSync />} />
        </Routes>
      </Grid>
    </Box>
  );
}

export default App;
