import React, { useState } from "react";
import { Card, Button, Badge, Spinner, Form, Alert } from "react-bootstrap";
import { Link, withRouter, Redirect } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import { loginUser, checkIfAuthenticated } from "../../../services/AuthService";

const Login = (props) => {
    const initialForm = {
        isLoading: false,
        email: "",
        password: "",
        errors: {},
        errorMessage: "",
        validated: false,
    };
    const [formData, setFormData] = useState(initialForm);

    const { email, password } = formData;

    const changeInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        setFormData({ ...formData, validated: true, isLoading: true });

        const { history } = props;

        const postBody = {
            email: formData.email,
            password: formData.password,
        };

        const response = await loginUser(postBody);
        console.log(response);
        if (response.success) {
            setFormData({
                email: "",
                password: "",
                isLoading: false,
                errors: {},
                errorMessage: "",
            });
            localStorage.setItem("loginData", JSON.stringify(response));
            window.location.href = PUBLIC_URL;
        } else {
            console.log("response.errors", response.errors);
            setFormData({
                errors: response.errors,
                isLoading: false,
                errorMessage: response.message,
            });
            localStorage.setItem("loginData", null);
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
                <div className="text-center">
                    <h2>Sign In</h2>
                </div>
                <div className="clearfix"></div>
            </div>

            <Form onSubmit={(e) => submitForm(e)}>
                <div className="row justify-content-center">
                    <div className="col-8">
                        <Card>
                            <Card.Body>
                                {formData.errorMessage.length > 0 && (
                                    <Alert
                                        variant="danger"
                                        onClose={() =>
                                            setFormData({
                                                ...formData,
                                                errorMessage: "",
                                            })
                                        }
                                        dismissible
                                    >
                                        {formData.errorMessage}
                                    </Alert>
                                )}

                                <Form.Group controlId="email">
                                    <Form.Label>
                                        Username/Email Address
                                    </Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter Your Username/Email Address"
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

                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Enter Password"
                                        value={password}
                                        name="password"
                                        onChange={(e) => changeInput(e)}
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

                                {formData.isLoading && (
                                    <Button
                                        variant="success"
                                        type="button"
                                        disabled
                                        block
                                    >
                                        <Spinner
                                            animation="border"
                                            role="status"
                                        >
                                            <span className="sr-only">
                                                Loading...
                                            </span>
                                        </Spinner>{" "}
                                        Signing In...
                                    </Button>
                                )}

                                {!formData.isLoading && (
                                    <Button
                                        variant="success"
                                        type="submit"
                                        block
                                    >
                                        Sign In
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Form>
        </>
    );
};

export default withRouter(Login);
