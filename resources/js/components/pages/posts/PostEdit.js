import React, { useState, useEffect } from "react";
import { Card, Button, Badge, Spinner, Form } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import { PUBLIC_URL } from "../../../constants";
import { storeNewPost, updatePost } from "../../../services/PostService";

const PostEdit = (props) => {
    const [post, setPost] = useState({
        isLoading: false,
        id: props.project.id,
        name: props.project.name,
        description: props.project.description,
        status: props.project.status,
        errors: {},
    });

    const changeInput = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value,
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        const { history } = props;

        setPost({ ...post, isLoading: true });
        const postBody = {
            name: post.name,
            description: post.description,
            status: post.status,
        };
        const response = await updatePost(post.id, postBody);
        if (response.success) {
            setPost({
                name: "",
                description: "",
                isLoading: false,
            });
            props.onCompletePostEdit();
        } else {
            setPost({
                errors: response.errors,
                isLoading: false,
            });
        }
    };
    return (
        <>
            <Card>
                <Card.Body>
                    <Form onSubmit={(e) => submitForm(e)}>
                        <div className="row mb-2">
                            <div className="col-6">
                                <Form.Group controlId="name">
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Project Name"
                                        value={post.name}
                                        name="name"
                                        onChange={(e) => changeInput(e)}
                                    />
                                </Form.Group>
                                {post.errors && post.errors.name && (
                                    <p className="text-danger">
                                        {post.errors.name[0]}
                                    </p>
                                )}
                            </div>

                            <div className="col-6">
                                <Form.Group controlId="description">
                                    <Form.Label>Project Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Project Description"
                                        as="textarea"
                                        rows="1"
                                        name="description"
                                        value={post.description}
                                        onChange={(e) => changeInput(e)}
                                    />
                                </Form.Group>
                                {post.errors && post.errors.description && (
                                    <p className="text-danger">
                                        {post.errors.description[0]}
                                    </p>
                                )}
                            </div>

                            <div className="col-6">
                                <Form.Label>Project Status</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={post.status}
                                    name="status"
                                    onChange={(e) => changeInput(e)}
                                >
                                    <option value={0}>Pending</option>
                                    <option value={1}>Completed</option>
                                </Form.Control>

                                {post.errors && post.errors.status && (
                                    <p className="text-danger">
                                        {post.errors.status[0]}
                                    </p>
                                )}
                            </div>
                        </div>

                        {post.isLoading && (
                            <Button variant="primary" type="button" disabled>
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>{" "}
                                Saving...
                            </Button>
                        )}

                        {!post.isLoading && (
                            <Button variant="primary" type="submit">
                                Save Project
                            </Button>
                        )}
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default withRouter(PostEdit);
