import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Spinner, Alert } from "react-bootstrap";
import { PUBLIC_URL } from "../../../constants";
import { postsList } from "../profile/ProfileView";

const PostUser = () => {
    const postList = useContext(postsList);
    console.log(postList);
    return (
        <>
            {postList.length === 0 && (
                <Alert variant={"warning"}>
                    No Posts Found !! Please create one...
                </Alert>
            )}

            {postList.map((eachPost, index) => (
                <Card key={index} className="mt-3">
                    <Link to={`${PUBLIC_URL}posts/${eachPost.id}`}>
                        <Card.Header>{eachPost.title}</Card.Header>
                    </Link>
                    <Card.Body>
                        <Card.Text>{eachPost.description}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </>
    );
};

export default PostUser;
