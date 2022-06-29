import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "../BuildControls/BuildControl/BuildControl";

let controls = [
  { Label: "Cheese", type: "cheese" },
  { Label: "Bacon", type: "bacon" },
  { Label: "Salad", type: "salad" },
  { Label: "Meat", type: "meat" },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price :<strong> {props.price.toFixed(2)}</strong></p>
      {controls.map((ctrl) => (

        <BuildControl 
        key={ctrl.Label} 
        Label={ctrl.Label} 
        added={()=>props.ingredientAdded(ctrl.type)} 
        removed={()=>props.ingrediendtRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}/>
      ))}
      <button 
      className={classes.OrderButton}
      disabled={!props.purchaseable}
      onClick={props.ordered}
      >ORDER NOW</button>
    </div>
  );
};

export default buildControls;
