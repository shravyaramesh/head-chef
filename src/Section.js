import React, { Component } from "react";
import PropTypes from "prop-types";
import Dish from "./Dish";
import dishObject from "./dishClass";

class Section extends Component {
  render() {
    const { category, dishes, onInputChange, selected_menu } = this.props;
    const categoryMap = {
      drink: " Drinks",
      starter: "Starters",
      main: "Main Course",
      dessert: "Desserts",
    };
    return (
      <div
        className="row"
        style={{
          position: "relative",
          display: "block",
          marginBottom: "5%",
        }}
      >
        <h2 style={{ marginTop: "0" }}>{categoryMap[category]}</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gridGap: "35px",
            gridRowGap: "50px",
            alignItems: "stretch",
            height: "auto",
          }}
        >
          {dishes.map(function (dish) {
            return (
              <Dish
                key={dish.id}
                dish={new dishObject(dish)}
                category={category}
                onInputChange={onInputChange} // selected menu updation in home
                selected_menu={selected_menu}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

Section.propTypes = {
  category: PropTypes.string.isRequired,
  dishes: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
  selected_menu: PropTypes.object.isRequired,
};

export default Section;
