import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollToTopBtn from "./menu/ScrollToTop";
import Header from "./menu/header";
import Home2grey from "./pages/home2Grey";
import Exploregrey from "./pages/exploreGrey";
import Author from "./pages/Author";
import AuthorGrey from "./pages/AuthorGrey";
import Wallet from "./pages/wallet";
import Create2 from "./pages/createSingle";
import ItemDetail from "./pages/ItemDetail";
import Create3 from "./pages/createMultiple";
import Createoption from "./pages/createOptions";
import auth from "../core/auth";
import Profile from "./pages/Profile";
import { createGlobalStyle } from "styled-components";
import { connect } from "react-redux";

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

const ProtectedRoute = ({ children }) => {
  let location = useLocation();
  const isAuth = auth.getToken() !== null;

  return isAuth ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const app = () => (
  <div className="wraper">
    <GlobalStyles />
    <Header />
    <Routes>
      <Route path="*" element={<Navigate to="/home" replace />} />
      <Route path="/Author">
        <Route
          path=":authorId"
          element={
            <ProtectedRoute>
              <Author />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/Profile">
        <Route
          path=":authorId"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route element={<Home2grey />} path="/" />
      <Route element={<Exploregrey />} path="/exploreGrey" />
      <Route element={<AuthorGrey />} path="/AuthorGrey/:authorId" />
      <Route element={<Wallet />} path="/wallet" />
      <Route element={<Create2 />} path="/createSingle" />
      <Route element={<ItemDetail />} path="/itemDetail" />

      <Route element={<Create3 />} path="/createMultiple" />
      <Route element={<Createoption />} path="/createOptions" />
    </Routes>
    <ScrollToTopBtn />
  </div>
);

const mapStateToProps = (state) => {
  return {
    account: state.account,
    token: state.token,
    paramType: state.paramType,
    profileData: state.profileData,
    exploreSaleType: state.exploreSaleType,
  };
};

export default connect(mapStateToProps)(app);
