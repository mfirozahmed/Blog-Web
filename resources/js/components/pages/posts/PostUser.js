import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Alert } from "react-bootstrap";
import { PUBLIC_URL } from "../../../constants";
import { postsList } from "../profile/ProfileView";

const PostUser = () => {
    /* Get the posts using context api */
    const postList = useContext(postsList);
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
                        <Card.Header>
                            <h4>{eachPost.title}</h4>
                        </Card.Header>
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
