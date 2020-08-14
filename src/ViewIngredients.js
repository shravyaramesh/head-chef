import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./App.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import HomeButton from "./HomeButton";

const styles = {
  table: {
    minWidth: 650,
  },
};

class ViewIngredients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serving: 0,
    };
  }

  render() {
    const { required_ingredients } = this.props;

    const classes = this.props;
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
          <h1>Required Ingredients</h1>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Ingredients</TableCell>
                  <TableCell>Quantity (grams/ml)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {required_ingredients.map((element) => (
                  <TableRow>
                    <TableCell>{i++}</TableCell>
                    <TableCell>{element["name"]}</TableCell>
                    <TableCell>{element["quantity"]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}

ViewIngredients.propTypes = {
  required_ingredients: PropTypes.array.isRequired,
};

export default withStyles(styles)(ViewIngredients);
