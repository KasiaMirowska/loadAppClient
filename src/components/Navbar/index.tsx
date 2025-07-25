import { Breadcrumbs, styled } from "@mui/material";
import Grid from "@mui/material/Grid2";

import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import theme from "../../theme";
import type { ComponentType } from "react";
import { resetState } from "../../features/redux/tranReducer";

const NavContainer = styled(Grid)(({ theme }) => ({
  color: "white",
  justifyContent: "center",
}));

const LinkContainer = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  color: "white",
  fontWeight: "normal",
  transition: "opacity 0.3s ease-in-out",
  padding: "0.5em",
  "&:hover": {
    opacity: 0.7,
  },
}));

const withStyledIcon = (Icon: ComponentType<any>) =>
  styled(Icon)(({ theme }) => ({
    fontSize: "1.5rem",
    color: "inherit", //inherits the white from the wrapping LinkContainer
    marginRight: theme.spacing(1),
    transition: "color 0.3s ease",

    "&:hover": {
      color: theme.palette.secondary.main,
    },
  }));

const StyledHomeIcon = withStyledIcon(HomeIcon);
const StyledWhatshotIcon = withStyledIcon(WhatshotIcon);
const StyledGrainIcon = withStyledIcon(GrainIcon);

export const Navbar: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <NavContainer>
      <Breadcrumbs
        aria-label="breadcrumbs"
        separator="/"
        style={{ color: "white" }}
      >
        <LinkContainer to="/" onClick={() => dispatch(resetState())}>
          <StyledHomeIcon />
          Home
        </LinkContainer>
        <LinkContainer to="/manualEntry">
          <StyledWhatshotIcon />
          Manual Entry
        </LinkContainer>
        <LinkContainer to="/uploadReceipts">
          <StyledGrainIcon />
          Upload Receipts
        </LinkContainer>
      </Breadcrumbs>
    </NavContainer>
  );
};
