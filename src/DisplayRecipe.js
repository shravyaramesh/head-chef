import React, { Component } from "react";
import PropTypes from "prop-types";
import HomeButton from "./HomeButton";
import recipe_book from "./data/recipe_book.json";
var images = require.context("./images", true);

class DisplayRecipe extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      category: "",
      name: "",
      serving: "",
      ingredients: [],
      method: "",
      img_src: "",
    };
  }
  componentDidMount() {
    console.log(this.props);
    const { id, category } = this.props.match.params;
    this.setState({
      img_src: images(`./${id}.jpg`),
    });
    this.getRecipe(category, id);
  }
  getRecipe = (s_category, s_id) => {
    const recipe_list = recipe_book[s_category];
    for (var i = 0; i < recipe_list.length; i++) {
      if (recipe_list[i]["id"] === s_id) {
        const r_serving = recipe_list[i]["serving"];
        this.setState({
          serving: r_serving,
        });

        const name = recipe_list[i]["name"];
        this.setState({
          name: name,
        });

        const r_ingredients = recipe_list[i]["ingredients"];

        const method = recipe_list[i]["method"];
        this.setState({
          method: method,
        });

        var ing_list = [];
        for (var j = 0; j < r_ingredients.length; j++) {
          const item = r_ingredients[j];
          var i_quantity = item["quantity"];
          const ingredient_name = item["name"];
          var ingredient = ingredient_name + " " + i_quantity;
          ing_list.push(ingredient);
        }
        this.setState({
          ingredients: ing_list,
        });
      }
    }
  };

  render() {
    console.log("image src: " + this.state.img_src);
    var i = 1;
    return (
      <div>
        <div style={{ marginTop: "10px", marginLeft: "2%" }}>
          <HomeButton />
        </div>
        <div
          style={{
            position: "relative",
            display: "block",
            marginLeft: "7%",
            marginRight: "7%",
            marginBottom: "5%",
          }}
        >
          <h2>{this.state.name}</h2>
          <div className="container-recipe">
            <div className="display-recipe-img-container">
              <img
                className="display-recipe-img"
                src={this.state.img_src}
                alt={this.state.id}
              />

              {/* {Map ingredients under ingredients h4} */}
            </div>
            <div
              style={{
                position: "relative",
                display: "block",
                marginLeft: "5%",
                marginTop: 0,
              }}
            >
              <div>
                <h4
                  style={{ display: "block", marginTop: 0, marginBottom: "1%" }}
                >
                  Ingredients
                </h4>
                {this.state.ingredients.map((item) => (
                  <p style={{ margin: 0 }}>{item}</p>
                ))}
              </div>
              <div style={{ marginTop: "5%" }}>
                <h4 style={{ margin: 0, paddingBottom: "1%" }}>Method</h4>
                <p style={{ display: "block", width: "100%", margin: 0 }}>
                  {this.state.method}
                </p>
                <h3>Serves:{this.state.serving}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayRecipe;
