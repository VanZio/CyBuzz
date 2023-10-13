import "./index.css";



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//
// Arvan Talaska
// 103952502
// Homepage

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import Upload from "./pages/Upload.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Payment from "./pages/Payment.jsx";
import Login from "./pages/Login.jsx";
import CreateAccount from "./pages/CreateAccount.jsx";
import Account from "./pages/Account.jsx";
import Result from "./pages/Result.jsx";

{
  /* Making the Link library work*/
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "Upload",
    element: <Upload />,
  },
  {
    path: "Payment",
    element: <Payment />,
  },
  {
    path: "Login",
    element: <Login />,
  },
  {
    path: "Account",
    element: <Account />,
  },
  {
    path: "CreateAccount",
    element: <CreateAccount />,
  },
  {
    path: "Result",
    element: <Result />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
