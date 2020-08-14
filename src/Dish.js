import React, { Component } from "react";
import PropTypes from "prop-types";

import ServingEditor from "./ServingEditor";
import ViewRecipe from "./ViewRecipe";
var images = require.context("./images", true);

class Dish extends Component {
  render() {
    const { dish, category, onInputChange } = this.props;
    const img_src = images(`./${dish.getID()}.jpg`);
    const alt = dish.getName();

    return (
      <div style={{ position: "relative", alignSelf: "center" }}>
        <div className="dish-card" style={{ backgroundColor: "#fff" }}>
          <div>
            <img className="dish-card-image" src={img_src} alt={alt} />
          </div>

          <div className="card-body" style={{ padding: "5% 10% 8% 10%" }}>
            {/* {console.log(dish.getMethod())} */}
            <h5
              style={{ marginBottom: "5%", marginTop: "5%" }}
              className="card-title"
            >
              {dish.getName()}
            </h5>
            {/* <p className="card-text">description</p> */}
            <div style={{ marginBottom: "5%" }} className="card-body">
              <ViewRecipe id={dish.getID()} category={category} />
            </div>
            <ServingEditor
              category={category}
              id={dish.getID()}
              onInputChange={onInputChange} // update selected menu in home
              selected_menu={this.props.selected_menu}
            />
          </div>
        </div>
      </div>
    );
  }
}

Dish.propTypes = {
  dish: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  selected_menu: PropTypes.object.isRequired,
};

export default Dish;
