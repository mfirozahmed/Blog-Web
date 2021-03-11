import React, { useState, useEffect } from "react";
import { Card, Button, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../../constants";
import { getPostList } from "../../services/PostService";

const Home = () => {
    const [post, setPost] = useState({
        postList: [],
        isLoading: false,
    });

    useEffect(() => {
        getPostLists();
    }, []);

    const getPostLists = async () => {
        setPost({ ...post, isLoading: true });
        const response = await getPostList();
        if (response.success) {
            setPost({
                ...post,
                postList: response.data,
                isLoading: false,
            });
        } else {
            setPost({
                ...post,
                isLoading: false,
            });
        }
    };

    return (
        <>
            <div className="header-part">
                <div className="float-left">
                    <h2>Blogs</h2>
                </div>
                <div className="float-right">
                    <Link
                        to={`${PUBLIC_URL}post/create`}
                        className="btn btn-info"
                    >
                        Create New
                    </Link>
                </div>
                <div className="clearfix"></div>
            </div>
            {post.isLoading && (
                <div className="text-center mt-5">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            )}

            {post.postList.length === 0 && (
                <Alert variant={"warning"}>
                    No Posts Found !! Please create one...
                </Alert>
            )}

            {post.postList.map((eachPost, index) => (
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
export default Home;
