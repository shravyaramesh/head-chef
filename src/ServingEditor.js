import React, { useState, useEffect } from "react";
import { IconButton, TextField } from "@material-ui/core";
import {createTheme, MuiThemeProvider, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    border: 0,
    borderRadius: 3,
    color: "#595959",
    height: 48,
    width: "100%",
    textAlign: "center",
  },
  inputCenter: {
    textAlign: "center",
    color: "black",
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
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

const ServingEditor = ({ category, id, onInputChange, selected_menu }) => {
  const classes = useStyles();
  const [serving, setServing] = useState(0);

  useEffect(() => {
    const cat_array = selected_menu[category];
    let initialServing = 0;
    cat_array.forEach((dish) => {
      if (dish.hasOwnProperty(id)) {
        initialServing = dish[id];
      }
    });
    setServing(initialServing);
  }, [category, id, selected_menu]);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setServing(value);
    onInputChange(category, id, value);
  };

  const handleAddClick = () => {
    setServing((prevServing) => {
      const newServing = prevServing + 1
      onInputChange(category, id, newServing);
      return newServing;
    });
  };

  const handleRemoveClick = () => {
    setServing((prevServing) => {
      const newServing = prevServing > 0 ? prevServing - 1 : 0;
      onInputChange(category, id, newServing);
      return newServing;
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <MuiThemeProvider theme={theme}>
          <IconButton onClick={handleRemoveClick} color="secondary" size="medium">
            −
          </IconButton>
          <TextField
            InputProps={{
              classes: {
                input: classes.inputCenter,
              },
            }}
            className={classes.root}
            value={serving}
            onChange={handleInputChange}
            variant="outlined"
          />
          <IconButton onClick={handleAddClick} color="secondary" size="medium">
            +
          </IconButton>
        </MuiThemeProvider>
      </div>
    </div>
  );
};

export default ServingEditor;

