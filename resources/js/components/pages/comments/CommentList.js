import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import { PUBLIC_URL } from "../../../constants";
import { storeNewComment } from "../../../services/CommentService";
import { getProfile } from "../../../services/ProfileService";
import { checkIfAuthenticated } from "../../../services/AuthService";
import { commentsList } from "../posts/PostView";

function CommentList({ history, match }) {
    const [comment, setComment] = useState({
        user_id: "",
        description: "",
        isLoading: false,
    });

    useEffect(() => {
        console.log(history, match);
        const isAuthenticated = checkIfAuthenticated();
        if (isAuthenticated) {
            setComment({
                ...comment,
                user_id: isAuthenticated.id,
            });
        }
    }, []);

    const commentList = useContext(commentsList);

    const changeInput = (e) => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value,
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        //console.log(props);
        const postId = match.params.id;
        setComment({ ...comment, isLoading: true });
        const commentBody = {
            user_id: comment.user_id,
            post_id: postId,
            description: comment.description,
        };

        const profile = await getProfile(comment.user_id);

        const response = await storeNewComment(commentBody);
        console.log(response);
        if (response.success) {
            setComment({
                ...comment,
                description: "",
                isLoading: false,
            });
            const commentBody2 = {
                name: profile.data.name,
                post_id: postId,
                comment_id: response.data.id,
                description: comment.description,
            };
            commentList.unshift(commentBody2);
            //window.location.href = PUBLIC_URL + `posts/${postId}`;
            history.push(`${PUBLIC_URL}posts/${postId}`);
        } else {
            console.log("response.errors", response.errors);
            setComment({
                ...comment,
                errors: response.errors,
                isLoading: false,
            });
        }
    };

    return (
        <>
            {comment.user_id && (
                <Card>
                    <Card.Body>
                        <Form onSubmit={(e) => submitForm(e)}>
                            <Form.Group controlId="description">
                                <Form.Control
                                    type="text"
                                    placeholder="Add Comment"
                                    name="description"
                                    value={comment.description}
                                    onChange={(e) => changeInput(e)}
                                />
                            </Form.Group>

                            <div className="float-right">
                                <Button variant="primary" type="submit">
                                    Add Comment
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            )}
            {commentList.map((comment, index) => (
                <Card key={index} className="mt-1 mb-1">
                    <Card.Body>
                        <div className="float-left">{comment.name}</div>
                        <div className="clearfix"></div>

                        <Card.Text>{comment.description}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </>
    );
}

export default withRouter(CommentList);
