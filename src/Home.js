import React, { useState } from "react";
import {recipeBook} from "./data/index";
import Section from "./Section";
import MakeMenu from "./MakeMenu";
import PropTypes from "prop-types";

const Home = ({
  selected_menu,
  updateSelectedMenu,
  updateRequiredIngredients,
}) => {
  const [menu_options] = useState({ ...recipeBook });

  const search = (id, array) => {
    let index = -1;
    for (let i = 0; i < array.length; i++) {
      const obj = array[i];
      if (obj.hasOwnProperty(id)) index = i;
    }
    return index;
  };

  const onInputChange = (category, id, serving) => {
    let newSelectedMenu = { ...selected_menu };
    const array = selected_menu[category];
    const index = search(id, array);

    if (index !== -1) {
      if (serving === 0) {
        array.splice(index, 1);
      } else {
        array[index][id + ""] = serving;
      }
    } else {
      if (serving !== 0) {
        let item = {};
        item[id] = serving;
        array.push(item);
      }
    }

    newSelectedMenu[category] = array;
    updateSelectedMenu(newSelectedMenu);
  };

  const { drink, dessert, starter, main } = menu_options;

  return (
    <div>
      <MakeMenu
        selected_menu={selected_menu}
        updateRequiredIngredients={updateRequiredIngredients}
      />
      <div
        style={{
          position: "relative",
          display: "block",
          marginLeft: "7%",
          marginRight: "7%",
          marginBottom: "5%",
        }}
      >
        <Section
          category="drink"
          dishes={drink}
          onInputChange={onInputChange}
          selected_menu={selected_menu}
        />

        <Section
          category="starter"
          dishes={starter}
          onInputChange={onInputChange}
          selected_menu={selected_menu}
        />

        <Section
          category="main"
          dishes={main}
          onInputChange={onInputChange}
          selected_menu={selected_menu}
        />

        <Section
          category="dessert"
          dishes={dessert}
          onInputChange={onInputChange}
          selected_menu={selected_menu}
        />
      </div>
    </div>
  );
};

Home.propTypes = {
  selected_menu: PropTypes.shape({
    drink: PropTypes.array.isRequired,
    starter: PropTypes.array.isRequired,
    main: PropTypes.array.isRequired,
    dessert: PropTypes.array.isRequired,
  }).isRequired,
  updateSelectedMenu: PropTypes.func.isRequired,
  updateRequiredIngredients: PropTypes.func.isRequired,
};

export default Home;
