import React, { lazy, Suspense, useEffect, useState, Component } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
const Dictionary = lazy(
  () => import(/* webpackChunkName: "VidtuRouter" */ "./dictonary")
);
class App extends Component {
  state = {
    isTop: true
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(){
    if(window.scrollY < 10){
      // this.setState({
      //   isTop: true
      // });
    }
    else{
      // this.setState({
      //   isTop: false
      // });
    }
  }

  render() {
    
    return (
      <Suspense fallback={<>...</>}>
        <Dictionary isTop={this.state.isTop}/>
      </Suspense>
    );
  }
}

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
