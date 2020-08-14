import React, { Component } from "react";
import Header from "./Header";
import Home from "./Home";
import ViewIngredients from "./ViewIngredients";
import { Switch, Route } from "react-router-dom";
import Error from "./Error";
import DisplayRecipe from "./DisplayRecipe";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected_menu: {
        drink: [],
        starter: [],
        main: [],
        dessert: [],
      },
      required_ingredients: [],
    };
  }

  render() {
    const updateSelectedMenu = (selected_menu) => {
      this.setState({
        selected_menu: selected_menu,
      });
    };

    const updateRequiredIngredients = (required_ingredients) => {
      this.setState({
        required_ingredients: required_ingredients,
      });
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(routeProps) => (
              <Home
                {...routeProps}
                selected_menu={this.state.selected_menu}
                required_ingredients={this.state.required_ingredients}
                updateSelectedMenu={updateSelectedMenu}
                updateRequiredIngredients={updateRequiredIngredients}
              />
            )}
          />
          <Route
            path="/viewIngredients"
            exact
            render={(routeProps) => (
              <ViewIngredients
                {...routeProps}
                required_ingredients={this.state.required_ingredients}
              />
            )}
          />
          <Route path="/error" exact component={Error} />
          <Route
            path="/viewRecipe/:category/:id"
            exact
            render={(routeProps) => <DisplayRecipe {...routeProps} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
