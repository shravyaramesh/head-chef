import React from "react";
import Dish from "./Dish";
import dishObject from "./dishClass";

const Section = ({ category, dishes, onInputChange, selected_menu }) => {
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
        {dishes.map((dish) => (
          <Dish
            key={dish.id}
            dish={new dishObject(dish)}
            category={category}
            onInputChange={onInputChange}
            selected_menu={selected_menu}
          />
        ))}
      </div>
    </div>
  );
};

export default Section;

