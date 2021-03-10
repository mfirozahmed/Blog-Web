import React, { useState } from "react";
import { Card, Button, Spinner, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import { storeNewPost } from "../../../services/PostService";

function PostCreate(props) {
    const [state, setState] = useState({
        isLoading: false,
        name: "",
        description: "",
        errors: {},
    });

    const changeInput = (e) => {
        e.preventDefault();
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        const { history } = props;

        setState({ ...state, isLoading: true });
        const postBody = {
            title: state.name,
            description: state.description,
        };
        const response = await storeNewPost(postBody);
        //console.log(response);
        if (response.success) {
            setState({
                name: "",
                description: "",
                isLoading: false,
            });
            history.push(`${PUBLIC_URL}`);
        } else {
            console.log("response.errors", response.errors);
            setState({
                ...state,
                errors: response.errors,
                isLoading: false,
            });
        }
    };
    return (
        <>
            <div className="header-part">
                <div className="float-left">
                    <h2>Create Post</h2>
                </div>
                <div className="clearfix"></div>
            </div>
            <Card>
                <Card.Body>
                    <Form onSubmit={(e) => submitForm(e)}>
                        <Form.Group controlId="name">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Post Title"
                                name="name"
                                value={state.name}
                                onChange={(e) => changeInput(e)}
                            />
                        </Form.Group>
                        {state.errors && state.errors.name && (
                            <p className="text-danger">
                                {state.errors.name[0]}
                            </p>
                        )}

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Post Description"
                                as="textarea"
                                rows="5"
                                name="description"
                                value={state.description}
                                onChange={(e) => changeInput(e)}
                            />
                        </Form.Group>
                        {state.errors && state.errors.description && (
                            <p className="text-danger">
                                {state.errors.description[0]}
                            </p>
                        )}

                        {state.isLoading && (
                            <Button variant="primary" type="button" disabled>
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>{" "}
                                Saving...
                            </Button>
                        )}

                        {!state.isLoading && (
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        )}
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}

export default withRouter(PostCreate);
