import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithError from "../../hoc/withError/withError";

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
    ingredients: null,
    totalPrice: 4,
    purchaseable: false, // Disable and enable order button as per ingredients
    purchasing: false, // for Placing an order
    loader: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then((res) => {
        this.setState({ ingredients: res.data });
      })
      .catch((err) => {
        this.setState({ error: true });
      });
  }

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

  cancelPurchasing = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinue = () => {
    this.setState({ loader: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Anita",
        address: {
          zipcode: 121003,
          country: "India",
          street: "sector28",
        },
        email: "example@gmail.com",
      },
      deliveryMethod: "fast",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loader: false, purchasing: false });
        console.log(response);
      })
      .catch((err) => {
        this.setState({ loader: false, purchasing: false });

        console.log(err);
      });
  };

  render() {
    const disableInfo = { ...this.state.ingredients };
    for (let key in disableInfo) {
      //this will return the key whose value is equal to zero or less than zero
      disableInfo[key] = disableInfo[key] <= 0;
      //{ cheese: false, meat: true, salad: false, bacon: false }
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients aren't loaded</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Aux>
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

      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice}
          purchaseCancelled={this.cancelPurchasing}
          purchaseContinued={this.purchaseContinue}
          ingredients={this.state.ingredients}
        />
      );
    }

    if (this.state.loader) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.cancelPurchasing}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default WithError(BurgerBuilder, axios);
