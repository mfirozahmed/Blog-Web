import React, { useState, useEffect } from "react";
import { Card, Button, Spinner, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import { updatePost, showPost } from "../../../services/PostService";

const PostEdit = (props) => {
    const [post, setPost] = useState({
        isLoading: false,
        id: "",
        name: "",
        description: "",
        errors: {},
    });

    useEffect(() => {
        getPostDetails();
    }, []);

    const getPostDetails = async () => {
        setPost({ ...post, isLoading: true });
        const postId = props.match.params.id;
        const res = await showPost(postId);
        console.log(res);
        setPost({
            ...post,
            id: postId,
            name: res.data.post.title,
            description: res.data.post.description,
            isLoading: false,
        });
    };

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
            title: post.name,
            description: post.description,
        };
        const response = await updatePost(post.id, postBody);
        if (response.success) {
            setPost({
                ...post,
                name: "",
                description: "",
                isLoading: false,
            });
            history.push(`${PUBLIC_URL}posts/${post.id}`);
        } else {
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
                    <h2>Edit Post</h2>
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
                                value={post.name}
                                name="name"
                                onChange={(e) => changeInput(e)}
                            />
                        </Form.Group>
                        {post.errors && post.errors.name && (
                            <p className="text-danger">{post.errors.name[0]}</p>
                        )}

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
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
                                Submit
                            </Button>
                        )}
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default withRouter(PostEdit);
