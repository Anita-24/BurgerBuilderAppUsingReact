import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

class BurgerBuilder extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {...}
  // }

  INGREDIENT_PRICE = {
    cheese: 0.5,
    meat: 1.6,
    salad: 0.4,
    bacon: 1.2,
  };

  state = {
    ingredients: {
      cheese: 0,
      meat: 0,
      salad: 0,
      bacon: 0,
    },
    totalPrice: 4,
    purchaseable: false, // Disable and enable order button as per ingredients
    purchasing: false, // for Placing an order
  };

  addIngredientHandler = (type) => {
    const OldCount = this.state.ingredients[type];
    const updatedCount = OldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const OldPrice = this.state.totalPrice;
    const newPrice = OldPrice + this.INGREDIENT_PRICE[type];
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredient = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const UdpatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = UdpatedCount;

    const OldPrice = this.state.totalPrice;
    const newPrice = OldPrice - this.INGREDIENT_PRICE[type];
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  updatePurchaseState = (ing) => {
    // getting the updatedIngredients from the state

    // const ing = { ...this.state.ingredients };
    const sum = Object.values(ing).reduce((sum, el) => {
      return (sum += el);
    }, 0);

    this.setState({ purchaseable: sum > 0 });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchasing=()=>{
    this.setState({purchasing:false})
  }

  purchaseContinue = ()=>{
    alert('You Continue!!!')
  }

  render() {
    const disableInfo = { ...this.state.ingredients };
    for (let key in disableInfo) {
      //this will return the key whose value is equal to zero or less than zero
      disableInfo[key] = disableInfo[key] <= 0;
      //{ cheese: false, meat: true, salad: false, bacon: false }
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.cancelPurchasing}>
          <OrderSummary 
          price={this.state.totalPrice}
          purchaseCancelled={this.cancelPurchasing}
          purchaseContinued={this.purchaseContinue}
          ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingrediendtRemoved={this.removeIngredient}
          disabled={disableInfo}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
