import React, { useState } from "react";
import Header from "./Header";
import Home from "./Home";
import ViewIngredients from "./ViewIngredients";
import { Route, Routes } from "react-router-dom";
import Error from "./Error";
import DisplayRecipe from "./DisplayRecipe";

const initialState = {
  selected_menu: {
    drink: [],
    starter: [],
    main: [],
    dessert: [],
  },
  required_ingredients: [],
};

export default function App () {

  const [state, setState] = useState(initialState);

  const updateSelectedMenu = (selected_menu) => {
    setState((prevState) => ({
      ...prevState,
      selected_menu: selected_menu,
    }));
  };

  const updateRequiredIngredients = (required_ingredients) => {
    setState((prevState) => ({
      ...prevState,
      required_ingredients: required_ingredients,
    }));
  };

  return (
    <div>
      <Header />
      <Routes>
      <Route
          path="/head-chef/"
          element={<Home
            selected_menu={state.selected_menu}
            updateSelectedMenu={updateSelectedMenu}
            updateRequiredIngredients={updateRequiredIngredients}
          />}
        />
        {/* <Route
          path="/viewIngredients"
          element={(routeProps) => (
            <ViewIngredients
              {...routeProps}
              required_ingredients={this.state.required_ingredients}
            />
          )}
        /> */}
        <Route path="/head-chef/error" element={<Error />} />
        {/* <Route
          path="/viewRecipe/:category/:id"
          element={(routeProps) => <DisplayRecipe {...routeProps} />}
        /> */}
      </Routes>
    </div>
  );
}
