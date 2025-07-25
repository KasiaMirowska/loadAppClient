import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#789696",
      light: "#a1b3b3",
      dark: "#5f7d7d",
      contrastText: "#fff",
    },
    secondary: {
      main: "#80b918",
      light: "#aacc00",
      dark: "#557a00",
      contrastText: "#fff",
    },
    background: {
      default: "#f0f6eb",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#4d4d4d",
    },
  },
  spacing: 8,
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: "2.5rem", fontWeight: 600 },
    h2: { fontSize: "2rem", fontWeight: 500 },
    h5: { fontSize: "1.25rem", fontWeight: 500 },
    body1: { fontSize: "1rem" },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
  },
});

export default theme;
