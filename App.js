import React from "react";
import "./App.css";
import {  Switch, Link } from "react-router-dom";
import Home from "./component/Home";
import CountryList from "./component/CountryList";
import Footer from "./component/Footer";
import CreateCountry from "./component/CreateCountry";
import Header from "./component/Header";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from 'react-redux';
function App(props) {
  return (
    <div className="App">
      <Provider store={props.store}>
      <BrowserRouter>
      <Header/>
      <br />
      <Route path="/" exact component={Home} />
        <Route path="/country" exact component={CountryList} />
        <Route path ="/createcountry" exact component = {CreateCountry}/>
    </BrowserRouter>
    <Footer />
    </Provider>

    </div>
  );
}
export default App;