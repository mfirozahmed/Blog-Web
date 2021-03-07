import React, { useState, useEffect } from "react";
import { Card, Button, Badge, Spinner, Form } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import { PUBLIC_URL } from "../../../constants";
import { storeNewPost } from "../../../services/PostService";

const PostCreate = (props) => {
    const [post, setPost] = useState({
        isLoading: false,
        name: "",
        description: "",
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
        };
        const response = await storeNewPost(postBody);
        //console.log(response);
        if (response.success) {
            setPost({
                name: "",
                description: "",
                isLoading: false,
            });
            history.push(`${PUBLIC_URL}`);
        } else {
            console.log("response.errors", response.errors);
            setPost({
                ...post,
                errors: response.errors,
                isLoading: false,
            });
        }
    };
    return (
        <>
            <div className="header-part">
                <div className="float-left">
                    <h2>New Post</h2>
                </div>
                <div className="float-right">
                    <Link to={`${PUBLIC_URL}posts`} className="btn btn-info">
                        See All Post
                    </Link>
                </div>
                <div className="clearfix"></div>
            </div>

            <Card>
                <Card.Body>
                    <Form onSubmit={(e) => submitForm(e)}>
                        <Form.Group controlId="name">
                            <Form.Label>Post Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Project Name"
                                value={post.name}
                                name="name"
                                onChange={(e) => changeInput(e)}
                            />
                        </Form.Group>
                        {post.errors && post.errors.name && (
                            <p className="text-danger">{post.errors.name[0]}</p>
                        )}

                        <Form.Group controlId="description">
                            <Form.Label>Project Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Post Description"
                                as="textarea"
                                rows="5"
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

export default withRouter(PostCreate);
