import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { Container } from "react-bootstrap";

// Pages
import Home from "./pages/Home";
import MyBlogs from "./pages/MyBlogs";
import Users from "./pages/Users";
import { PUBLIC_URL } from "../constants";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { checkIfAuthenticated } from "../services/AuthService";
import AuthenticatedRoutes from "./AuthenticatedRoutes";

import PostCreate from "./pages/posts/PostCreate";
import PostEdit from "./pages/posts/PostEdit";
import PostView from "./pages/posts/PostView";

import ProfileView from "./pages/profile/ProfileView";
import ProfileEdit from "./pages/profile/ProfileEdit";

const App = () => {
    const [info, setInfo] = useState({
        user: {},
        isLoggedIn: false,
    });

    useEffect(() => {
        if (checkIfAuthenticated()) {
            setInfo({
                user: checkIfAuthenticated(),
                isLoggedIn: true,
            });
        }
    }, []);

    return (
        <div>
            <Router>
                <Header authData={info} />
                <div>
                    <Container className="p-4">
                        <Switch>
                            <Route
                                path={`${PUBLIC_URL}users`}
                                exact={true}
                                component={Users}
                            />
                            <AuthenticatedRoutes
                                authed={info.isLoggedIn}
                                path={`${PUBLIC_URL}my-blogs`}
                                exact={true}
                                component={MyBlogs}
                            />
                            <Route
                                path={`${PUBLIC_URL}posts/:id`}
                                component={PostView}
                                exact={true}
                            />
                            <AuthenticatedRoutes
                                authed={info.isLoggedIn}
                                path={`${PUBLIC_URL}post/create`}
                                component={PostCreate}
                                exact={true}
                            />
                            <AuthenticatedRoutes
                                authed={info.isLoggedIn}
                                path={`${PUBLIC_URL}post/edit/:id`}
                                component={PostEdit}
                                exact={true}
                            />
                            <Route
                                path={`${PUBLIC_URL}profile/:id`}
                                component={ProfileView}
                                exact={true}
                            />
                            <AuthenticatedRoutes
                                authed={info.isLoggedIn}
                                path={`${PUBLIC_URL}profile/edit/:id`}
                                component={ProfileEdit}
                                exact={true}
                            />
                            <Route
                                path={`${PUBLIC_URL}register`}
                                exact={true}
                                component={Register}
                            />
                            <Route
                                path={`${PUBLIC_URL}login`}
                                exact={true}
                                component={Login}
                            />
                            <Route
                                path={`${PUBLIC_URL}`}
                                exact={true}
                                component={Home}
                            />
                        </Switch>

                        <Footer />
                    </Container>
                </div>
            </Router>
        </div>
    );
};

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
