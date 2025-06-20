import { Breadcrumbs } from "@mui/material";
import Grid from "@mui/material/Grid2";

import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { activeServerInfo } from "../../features/redux/servReducer";
import { ServerType } from "../../features/redux/types";

const useStyles = makeStyles({
  nav: {
    color: "white",
  },

  link: {
    display: "flex",
    alignItems: "center", // ✅ Fixed typo
    justifyContent: "center",
    //padding: "0.5em 1em",
    textDecoration: "none", // ✅ Removes underline
    color: "white", // ✅ White text
    fontWeight: "normal",
    transition: "opacity 0.3s ease-in-out", // ✅ Smooth hover effect
    padding: "0.5em",
    "&:hover": {
      opacity: 0.7, // ✅ Slight fade effect on hover
    },
  },
  icon: {
    color: "white",
    fontSize: "1em",
    marginRight: "0.25em",
  },
  separator: {
    color: "white", // Ensure separator color is white

    // fontWeight: "bold", // Match the weight of the text
  },
});

export const Navbar: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Grid justifyContent="center" className={classes.nav}>
      <Breadcrumbs
        aria-label="breadcrumbs"
        separator="/"
        classes={{ separator: classes.separator }}
      >
        <Link
          to="/"
          className={classes.link}
          onClick={() => dispatch(activeServerInfo(ServerType.nonePicked))}
        >
          <HomeIcon className={classes.icon} />
          Home
        </Link>
        <Link to="/manualEntry" className={classes.link}>
          <WhatshotIcon className={classes.icon} />
          Manual Entry
        </Link>
        <Link to="/uploadReceipts" className={classes.link}>
          <GrainIcon className={classes.icon} />
          Upload Receipts
        </Link>
      </Breadcrumbs>
    </Grid>
  );
};
