export default class DishClass {
  constructor({ id, name, serving, ingredients, method }) {
    this.id = id;
    this.name = name;
    this.serving = serving;
    this.ingredients = ingredients;
    this.method = method;
  }
  //getters
  getID() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getServing() {
    return this.serving;
  }

  getIngredients() {
    return this.ingredients; //returns an array
  }

  getMethod() {
    return this.method;
  }
}
