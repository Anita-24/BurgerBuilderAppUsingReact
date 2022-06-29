import React from "react";
import Aux from "../../../hoc/Auxiliary";
import  Button from '../../UI/Button/Button'
const orderSummary = (props) => {
  // this way we want the data in the order summary
  //<li> Salad :1 </li>

  const ingredientsSummary = Object.keys(props.ingredients)
  .map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{textTransform:'capitalize'}}>{igKey}</span> :{props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Here is your Delicious burger with the folowing ingredients:</p>
      <ul>
        {ingredientsSummary}
      </ul>
      <p><strong>Total Price : {props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
    </Aux>
  );
};

export default orderSummary;
