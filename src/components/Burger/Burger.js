import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "../Burger/BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  // INGREDIENTS LISTS CONVERTING TO ARRAY AND SENDING AS PROPS TO BURGERINGREDIENT COMPONENT
  let TransformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      // CHECKING WHETHER THE ARRAY IS EMPTY OR HAS VALUES 
      return arr.concat(el);
    }, []);

  if (TransformedIngredients.length === 0) {
    TransformedIngredients = <p>Please start adding ingredients</p>;
  }


  // console.log("TransformedIngredients>>>>>>>>>>>>>>>", TransformedIngredients);

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {TransformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
