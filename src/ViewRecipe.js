import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, IconButton, Box, TextField, Input } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const styles = {
  root: {
    //background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    //boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "#595959",
    height: 48,
    width: "100%",
    // padding: "0 30px",
    //alignItems: "center",
    textAlign: "center",
  },
  inputCenter: {
    textAlign: "center",
    color: "red",
  },
};

class ViewRecipe extends Component {
  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          light: "#757ce8", //#6b6b6b
          main: "#3f50b5", //#595959
          dark: "#002884", //#404040
          contrastText: "#fff",
        },
        secondary: {
          light: "#ff7961",
          main: "#E50914",
          dark: "#ba000d",
          contrastText: "#fff",
        },
      },
    });

    const { classes, id, category } = this.props;
    return (
      <Link
        to={`/viewRecipe/${category}/${id}`}
        style={{ textDecoration: "none" }}
      >
        <MuiThemeProvider theme={theme}>
          <Button
            style={{ width: "100%" }}
            variant="outlined"
            color="secondary"
            size="medium"
          >
            View recipe
          </Button>
        </MuiThemeProvider>
      </Link>
    );
  }
}

ViewRecipe.propTypes = {
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default ViewRecipe;
