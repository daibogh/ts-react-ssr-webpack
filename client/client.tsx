import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/app";
import {BrowserRouter} from "react-router-dom";
import { loadableReady } from '@loadable/component';
loadableReady(() => {
ReactDOM.hydrate(<BrowserRouter><App /></BrowserRouter>, document.getElementById("root"))});
