import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Fab } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

class HomeButton extends Component {
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

    return (
      <Link to="/" style={{ textDecoration: "none" }}>
        {/* <button onClick={(e) => onClick(e)}> */}
        <MuiThemeProvider theme={theme}>
          <Fab
            variant="extended"
            position="center-bottom"
            focusVisible={true}
            // onClick={(e) => onClick(e)}
            disableUnderline={true}
            // slot="fixed"
            color="secondary"
          >
            <label>{"Go To Home Page"}</label>
          </Fab>
        </MuiThemeProvider>
      </Link>
    );
  }
}

HomeButton.propTypes = {
  dish: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  selected_menu: PropTypes.object.isRequired,
};

export default HomeButton;
