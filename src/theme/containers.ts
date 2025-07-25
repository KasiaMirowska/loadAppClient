// containers.ts
import { styled } from "@mui/material/styles";
import { Box, Grid, Card } from "@mui/material";

export const MainContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(6),
  display: "flex",
  minHeight: "100vh",
  width: "100%",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(1), // or remove it entirely
  },
}));

export const FormCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "center",
  [theme.breakpoints.up("md")]: {
    minWidth: "600px",
    padding: theme.spacing(4),
  },
}));

export const Header = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  color: "green",
}));
