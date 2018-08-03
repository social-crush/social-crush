import React, { Component } from "react";
import { Route } from "react-router-dom";

// Components
import { Layout } from "./components/Layout";

import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import Chatting from "./components/chatting/Chatting";
import EditProfile from "./components/edit_profile/EditProfile";
import ChangePassword from "./components/change_password/ChangePassword";
import ForgotPassword from "./components/forgotpassword/ForgotPassword";
import Page404 from "./components/page404/Page404";

export const routes = (
  <Layout>
    <Route exact path="/" component={Landing} />
    <Route exact path="/index" component={Landing} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/chatting" component={Chatting} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/edit_profile" component={EditProfile} />
    <Route exact path="/change_password" component={ChangePassword} />
    <Route exact path="/forgotpassword" component={ForgotPassword} />
    {/* <Route component={Page404} /> */}
  </Layout>
);
