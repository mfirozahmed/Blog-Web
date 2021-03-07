import React, { useState } from "react";
import { Container, NavDropdown, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../../constants";

const Header = (props) => {
    const logout = () => {
        localStorage.removeItem("loginData");
        window.location.href = PUBLIC_URL + "login";
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Link to={`${PUBLIC_URL}`}>
                    <Navbar.Brand>Blog Web</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to={`${PUBLIC_URL}`}>
                            <Nav.Item className="text-white mr-2 ">
                                Home
                            </Nav.Item>
                        </Link>
                        {props.authData.isLoggedIn && (
                            <>
                                <Link to={`${PUBLIC_URL}my-blogs`}>
                                    <Nav.Item className="text-white mr-2 ">
                                        My Blogs
                                    </Nav.Item>
                                </Link>
                                <Link to={`${PUBLIC_URL}profile`}>
                                    <Nav.Item className="text-white mr-2 ">
                                        My Profile
                                    </Nav.Item>
                                </Link>
                            </>
                        )}
                        <Link to={`${PUBLIC_URL}users`}>
                            <Nav.Item className="text-white mr-2 ">
                                Users Information
                            </Nav.Item>
                        </Link>
                    </Nav>
                    <Nav className="ml-auto">
                        {!props.authData.isLoggedIn && (
                            <>
                                <Link to={`${PUBLIC_URL}login`}>
                                    <Nav.Item className="text-white mr-2 ">
                                        Sign In
                                    </Nav.Item>
                                </Link>
                                <Link to={`${PUBLIC_URL}register`}>
                                    <Nav.Item className="text-white mr-2 ">
                                        Sign Up
                                    </Nav.Item>
                                </Link>
                            </>
                        )}
                    </Nav>
                    <Nav className="ml-auto">
                        {props.authData.isLoggedIn && (
                            <Nav.Link onClick={() => logout()}>
                                <Nav.Item className="text-white mr-2 ">
                                    Logout
                                </Nav.Item>
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
