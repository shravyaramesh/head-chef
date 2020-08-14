import React, { Component } from "react";
import recipe_book from "./data/recipe_book";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Fab } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

function Error(props) {
  const error = props.error;
  if (error === true) {
    return (
      <Alert severity="error">Please select an item from every category!</Alert>
    );
  } else {
    return <div style={{ fontSize: "0" }}></div>;
  }
}

class MakeMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirection: "/viewIngredients",
      required_ingredients: this.props.required_ingredients,
      updateMenu: false,
      error: false,
      home: "/",
      showError: false,
    };
  }

  isValidMenu = (selected_menu) => {
    var isDefined =
      selected_menu["drink"] != null &&
      selected_menu["starter"] != null &&
      selected_menu["main"] != null &&
      selected_menu["dessert"] != null;

    var hasMoreThanOneItem =
      selected_menu["drink"].length *
        selected_menu["starter"].length *
        selected_menu["main"].length *
        selected_menu["dessert"].length >
      0;

    return isDefined && hasMoreThanOneItem;
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        updateMenu: true,
        error: this.isValidMenu(this.props.selected_menu),
      });
    }
  }

  render() {
    const { selected_menu } = this.props;
    // eslint-disable-next-line
    const onClick = (e) => {
      if (this.state.updateMenu && this.isValidMenu(selected_menu)) {
        calculateRequiredIngredients();
        this.props.updateRequiredIngredients(this.state.required_ingredients);
      } else {
        this.setState({ showError: true });
      }
    };
    const search = (id, array) => {
      let index = -1;
      for (var i = 0; i < array.length; i++) {
        const obj = array[i];
        if (obj["name"] === id) index = i;
      }
      return index;
    };
    const mergeToFinalList = (child_list) => {
      let required_ingredients = this.state.required_ingredients; //parent
      for (var i = 0; i < child_list.length; i++) {
        var child_obj = child_list[i];

        let index = search(child_obj["name"], required_ingredients);

        if (index !== -1) {
          required_ingredients[index]["quantity"] =
            required_ingredients[index]["quantity"] + child_obj["quantity"];
        } else {
          required_ingredients.push(child_obj);
        }
      }

      this.setState({
        required_ingredients: required_ingredients,
      });
    };

    const calculateRequiredIngredients = () => {
      var s_entries = Object.entries(selected_menu);
      for (var i = 0; i < s_entries.length; i++) {
        const s_category = s_entries[i][0];
        var s_list = s_entries[i][1];
        for (var k = 0; k < s_list.length; k++) {
          var s_item = Object.entries(s_list[k]);
          s_item.map(([s_id, s_serving]) =>
            mergeToFinalList(getIngredients(s_category, s_id, s_serving))
          );
        }
      }
    };

    const getIngredients = (s_category, s_id, s_serving) => {
      var required_ingredients_temp = [];
      const recipe_list = recipe_book[s_category];
      for (var i = 0; i < recipe_list.length; i++) {
        if (recipe_list[i]["id"] === s_id) {
          const r_serving = recipe_list[i]["serving"];
          const r_ingredients = recipe_list[i]["ingredients"];
          for (var j = 0; j < r_ingredients.length; j++) {
            const ingredient = r_ingredients[j];
            var i_quantity = getIngredientQuantity(ingredient["quantity"]);

            var required_quantity = (i_quantity / r_serving) * s_serving;
            var requirement = {
              name: ingredient["name"],
              quantity: Math.ceil(required_quantity),
              metric: "grams/ml",
            };
            required_ingredients_temp.push(requirement);
          }
        }
      }

      return required_ingredients_temp;
    };

    const getIngredientQuantity = (str) => {
      var array = str.split(" ");
      let map = new Map([
        ["tbsp", 15],
        ["cup", 125],
        ["tsp", 5],
        ["oz", 450],
        ["grams", 1],
        ["", 1],
      ]);
      return parseFloat(array[0]) * map.get(array[1]);
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

    return (
      <div style={{ position: "relative", textAlign: "end" }}>
        <div
          style={{
            position: "relative",
            display: "block",
            top: "3%",
            right: "0",
            zIndex: "100",
            marginTop: "10px",
            marginRight: "2%",
            marginLeft: "2%",
          }}
        >
          {this.state.showError && <Error error={this.state.error} />}

          <Link
            to={
              this.isValidMenu(this.props.selected_menu)
                ? this.state.redirection
                : this.state.home
            }
            style={{ textDecoration: "none" }}
          >
            <MuiThemeProvider theme={theme}>
              <Fab
                variant="extended"
                position="center-bottom"
                focusVisible={true}
                onClick={(e) => onClick(e)}
                disableUnderline={true}
                // slot="fixed"
                color="secondary"
              >
                <label>{"Make Menu"}</label>
              </Fab>
            </MuiThemeProvider>
          </Link>
        </div>
      </div>
    );
  }
}

MakeMenu.propTypes = {
  selected_menu: PropTypes.object.isRequired,
  required_ingredients: PropTypes.array.isRequired,
  updateRequiredIngredients: PropTypes.func.isRequired,
};

export default MakeMenu;
