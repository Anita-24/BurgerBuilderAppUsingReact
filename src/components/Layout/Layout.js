import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.css";
import ToolBar from "../Navigation/Toolbar/Toolbar";
import SideBar from "../Navigation/Sidebar/Sidebar";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedhandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <ToolBar drawerToggleClicked={this.sideToggleHandler}/>
        <SideBar
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedhandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
