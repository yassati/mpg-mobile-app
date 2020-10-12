import React, { Component } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import WrapperNavigator from "./navigators/WrapperNavigator";

export default class App extends Component {
  render() {
    return (
      <PaperProvider>
        <WrapperNavigator />
      </PaperProvider>
    );
  }
}
