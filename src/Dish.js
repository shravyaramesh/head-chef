import React from "react";
import ServingEditor from "./ServingEditor";
import ViewRecipe from "./ViewRecipe";
var images = require.context("./images", true);

const Dish = ({ dish, category, onInputChange, selected_menu }) => {
  const img_src = images(`./${dish.getID()}.jpg`);
  const alt = dish.getName();

  return (
    <div style={{ position: "relative", alignSelf: "center" }}>
      <div className="dish-card" style={{ backgroundColor: "#fff" }}>
        <div>
          <img className="dish-card-image" src={img_src} alt={alt} />
        </div>

        <div className="card-body" style={{ padding: "5% 10% 8% 10%" }}>
          <h5 style={{ marginBottom: "5%", marginTop: "5%" }} className="card-title">
            {dish.getName()}
          </h5>
          <div style={{ marginBottom: "5%" }} className="card-body">
            <ViewRecipe id={dish.getID()} category={category} />
          </div>
          <ServingEditor
            category={category}
            id={dish.getID()}
            onInputChange={onInputChange}
            selected_menu={selected_menu}
          />
        </div>
      </div>
    </div>
  );
};

export default Dish;

