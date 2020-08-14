import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, IconButton, Box, TextField, Input } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

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

class ServingEditor extends Component {
  constructor(props) {
    super(props);
    var selected_menu = { ...this.props.selected_menu };
    const category = this.props.category;
    const id = this.props.id;
    const cat_array = selected_menu[category];
    let serving = 0;
    cat_array.forEach((dish) => {
      if (dish.hasOwnProperty(id)) {
        serving = dish[id];
      }
    });
    this.state = {
      serving: serving,
    };
  }

  render() {
    const { category, id } = this.props;
    const onInputChange = (e) => {
      this.setState({
        serving: e.target.value,
      });
      this.props.onInputChange(this, category, id, e.target.value);
    };

    const onAddClick = (e) => {
      this.setState({
        serving: parseInt(this.state.serving) + 1,
      });

      this.props.onInputChange(
        this,
        category,
        id,
        parseInt(this.state.serving) + 1
      );
    };

    const onRemoveClick = () => {
      if (this.state.serving > 0) {
        this.setState({
          serving: this.state.serving - 1,
        });
        this.props.onInputChange(this, category, id, this.state.serving - 1);
      }
    };
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

    const { classes } = this.props;
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <MuiThemeProvider theme={theme}>
            <IconButton
              onClick={(e) => onAddClick(e)}
              variant="outlined"
              color="secondary"
              size="medium"
            >
              +
            </IconButton>
          </MuiThemeProvider>
          <TextField
            InputProps={{
              className: classes.input,
            }}
            className={classes.root}
            value={this.state.serving}
            onChange={(e) => onInputChange(e)}
            variant="outlined"
            classes={{
              input: classes.inputCenter,
            }}
          />
          <MuiThemeProvider theme={theme}>
            <IconButton
              onClick={(e) => onRemoveClick(e)}
              variant="outlined"
              color="secondary"
              size="medium"
            >
              −
            </IconButton>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

ServingEditor.propTypes = {
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  selected_menu: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ServingEditor);
