import React, { Component } from "react";
import recipe_book from "./data/recipe_book";
import Section from "./Section";
import MakeMenu from "./MakeMenu";
import PropTypes from "prop-types";

class Home extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.selected_menu);
    this.state = {
      menu_options: { ...recipe_book },
      selected_menu: {
        ...this.props.selected_menu,
      },
      //required_ingredients: [...this.props.required_ingredients], // remove
    };
  }

  search = (id, array) => {
    let index = -1;
    for (var i = 0; i < array.length; i++) {
      const obj = array[i];
      if (obj.hasOwnProperty(id)) index = i;
    }

    return index;
  };

  onInputChange = (event, category, id, serving) => {
    let selected_menu = this.state.selected_menu;
    const array = this.state.selected_menu[category]; //array:[{}]
    const index = this.search(id, array); //masala chai : 0 index

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
    selected_menu[category] = array;
    this.setState({
      selected_menu: selected_menu,
    });
    this.props.updateSelectedMenu(selected_menu);
  };

  render() {
    const drink = this.state.menu_options.drink;
    const dessert = this.state.menu_options.dessert;
    const starter = this.state.menu_options.starter;
    const main = this.state.menu_options.main;

    return (
      <div>
        <MakeMenu
          selected_menu={this.state.selected_menu}
          required_ingredients={this.props.required_ingredients}
          updateRequiredIngredients={this.props.updateRequiredIngredients}
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
            // style={{ position: "relative" }}
            category="drink"
            dishes={drink} //array : [chai obj, coffee obj]
            onInputChange={this.onInputChange}
            selected_menu={this.state.selected_menu}
          />

          <Section
            // style={{ position: "relative" }}
            category="starter"
            dishes={starter}
            onInputChange={this.onInputChange}
            selected_menu={this.state.selected_menu}
          />

          <Section
            // style={{ position: "relative" }}
            category="main"
            dishes={main}
            onInputChange={this.onInputChange}
            selected_menu={this.state.selected_menu}
          />

          <Section
            // style={{ position: "relative" }}
            category="dessert"
            dishes={dessert}
            onInputChange={this.onInputChange}
            selected_menu={this.state.selected_menu}
          />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  selected_menu: PropTypes.object.isRequired,
  updateSelectedMenu: PropTypes.func.isRequired,
  updateRequiredIngredients: PropTypes.func.isRequired,
};

export default Home;
