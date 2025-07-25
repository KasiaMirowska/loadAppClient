import React from "react";
import { Grid, Typography, Card, List, ListItem, Box } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

const MainContainer = styled(Box)(({ theme }) => {
  return {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(6),
    minHeight: "100vh",
  };
});

const CardsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  marginTop: theme.spacing(6),
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(2),
    flexDirection: "column",
    alignItems: "center",
  },
}));
// Styled Cards
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(1),
  minWidth: 0,
  maxWidth: 700,
  flex: "1 1 100%",
  [theme.breakpoints.down("sm")]: {
    margin: theme.spacing(1),
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const StyledCard2 = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(1),
  maxWidth: 300,
  flex: "1 1 100%",
  [theme.breakpoints.down("sm")]: {
    margin: theme.spacing(1),
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const SectionText = styled(Grid)(({ theme }) => ({
  flexDirection: "column",
  alignItems: "center",
  textAlign: "left",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

export const Home: React.FC = () => {
  const theme = useTheme();
  console.log("Active theme:", theme.palette.background.default);
  console.log("💡 useTheme background:", theme.palette.background.default);
  return (
    <MainContainer>
      <SectionText container spacing={2}>
        <Typography variant="h4" gutterBottom>
          Welcome to my basic POC React app that tracks your spending.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Enter your transactions manually or upload your receipts to be
          processed and saved.
        </Typography>
      </SectionText>

      <CardsContainer>
        <StyledCard>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Under the Hood — The Tech Behind the App
          </Typography>

          <Typography variant="h6">Backend:</Typography>
          <List dense>
            <ListItem>
              • Fully serverless architecture using AWS Lambda and S3 for
              receipt processing
            </ListItem>
            <ListItem>
              • Integrated with Google Cloud Vision API for text detection
            </ListItem>
            <ListItem>
              • Uses AWS Bedrock AI to extract transaction data
            </ListItem>
            <ListItem>
              • Fallback to manual parsing on service degradation
            </ListItem>
            <ListItem>• Stores structured data in Firestore</ListItem>
          </List>

          <Typography variant="h6">Frontend:</Typography>
          <List dense>
            <ListItem>• Built with React and TypeScript</ListItem>
            <ListItem>• State managed with Redux and Redux Toolkit</ListItem>
            <ListItem>
              • Styled using Material UI with custom theme overrides
            </ListItem>
          </List>
        </StyledCard>

        <StyledCard2>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Upcoming Features
          </Typography>
          <List dense>
            <ListItem>• Bank account sync</ListItem>
            <ListItem>• Full spending reports</ListItem>
          </List>
        </StyledCard2>
      </CardsContainer>
    </MainContainer>
  );
};
