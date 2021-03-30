import React, { useState } from "react";
import { Card, Button, Badge, Spinner, Form } from "react-bootstrap";
import { Link, withRouter, Redirect } from "react-router-dom";
import Axios from "axios";
import { PUBLIC_URL } from "../../../constants";
import {
    registerUser,
    checkIfAuthenticated,
} from "../../../services/AuthService";

const Register = (props) => {
    const initialForm = {
        isLoading: false,
        username: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        website: "",
        errors: {},
        validated: false,
    };
    const [formData, setFormData] = useState(initialForm);

    const {
        name,
        email,
        password,
        password_confirmation,
        username,
        website,
    } = formData;

    const changeInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        const { history } = props;

        const postBody = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.password_confirmation,
            username: formData.username,
            website: formData.website,
        };

        if (formData.password === formData.password_confirmation) {
            setFormData({ ...formData, validated: true, isLoading: true });
        }

        const response = await registerUser(postBody);
        console.log(response);
        if (response.success) {
            setFormData({
                username: "",
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                website: "",
                isLoading: false,
                errors: {},
            });
            localStorage.setItem("loginData", JSON.stringify(response));
            window.location.href = PUBLIC_URL;
        } else {
            console.log("response.errors", response.errors);
            setFormData({
                ...formData,
                errors: response.errors,
                isLoading: false,
            });
            //localStorage.setItem("loginData", null);
        }
    };

    if (true) {
        const res = checkIfAuthenticated();
        if (res) {
            return <Redirect to={`${PUBLIC_URL}`} />;
        }
    }
    return (
        <>
            <div className="header-part">
                <div className="float-left">
                    <h2>Sign Up</h2>
                </div>
                <div className="clearfix"></div>
            </div>

            <Card>
                <Card.Body>
                    <Form onSubmit={(e) => submitForm(e)}>
                        <div className="row">
                            <div className="col-6">
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter Your Name"
                                        value={name}
                                        name="name"
                                        onChange={(e) => changeInput(e)}
                                    />
                                    {formData.errors &&
                                        formData.errors.name && (
                                            <p className="text-danger">
                                                {formData.errors.name[0]}
                                            </p>
                                        )}
                                    <Form.Control.Feedback type="invalid">
                                        Please give your name
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-6">
                                <Form.Group controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter Your username"
                                        value={username}
                                        name="username"
                                        onChange={(e) => changeInput(e)}
                                    />
                                    {formData.errors &&
                                        formData.errors.username && (
                                            <p className="text-danger">
                                                {formData.errors.username[0]}
                                            </p>
                                        )}
                                    <Form.Control.Feedback type="invalid">
                                        Please give your username
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <Form.Group controlId="email">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        placeholder="Enter Email Address"
                                        value={email}
                                        name="email"
                                        onChange={(e) => changeInput(e)}
                                    />
                                    {formData.errors &&
                                        formData.errors.email && (
                                            <p className="text-danger">
                                                {formData.errors.email[0]}
                                            </p>
                                        )}
                                    <Form.Control.Feedback type="invalid">
                                        Please give your valid email address
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-6">
                                <Form.Group controlId="website">
                                    <Form.Label>Website</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter Your website"
                                        value={website}
                                        name="website"
                                        onChange={(e) => changeInput(e)}
                                    />
                                    {formData.errors &&
                                        formData.errors.website && (
                                            <p className="text-danger">
                                                {formData.errors.website[0]}
                                            </p>
                                        )}
                                    <Form.Control.Feedback type="invalid">
                                        Please give your website
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Enter Password"
                                        value={password}
                                        name="password"
                                        onChange={(e) => changeInput(e)}
                                        minLength={8}
                                    />
                                    {formData.errors &&
                                        formData.errors.password && (
                                            <p className="text-danger">
                                                {formData.errors.password[0]}
                                            </p>
                                        )}
                                    <Form.Control.Feedback type="invalid">
                                        Please give password
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-6">
                                <Form.Group controlId="password_confirmation">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Enter Password"
                                        value={password_confirmation}
                                        name="password_confirmation"
                                        onChange={(e) => changeInput(e)}
                                        minLength={8}
                                    />
                                    {formData.errors &&
                                        formData.errors
                                            .password_confirmation && (
                                            <p className="text-danger">
                                                {
                                                    formData.errors
                                                        .password_confirmation[0]
                                                }
                                            </p>
                                        )}
                                    <Form.Control.Feedback type="invalid">
                                        Please give confirm password
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                        </div>

                        {formData.isLoading && (
                            <Button variant="success" type="button" disabled>
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>{" "}
                                Signing Up...
                            </Button>
                        )}

                        {!formData.isLoading && (
                            <Button variant="success" type="submit">
                                Sign Up
                            </Button>
                        )}
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default withRouter(Register);
