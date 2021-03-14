import React, { useState, useEffect, useContext } from "react";
import { Card, Spinner, Alert } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../../constants";
import { getMyPostList } from "../../services/PostService";

const MyBlog = () => {
    const [post, setPost] = useState({
        postList: [],
        searchPostList: [],
        isLoading: false,
    });

    useEffect(() => {
        getMyPostLists();
    }, []);

    const getMyPostLists = async () => {
        setPost({ ...post, isLoading: true });
        const response = await getMyPostList();
        console.log(response);

        if (response.success) {
            setPost({
                ...post,
                postList: response.data,
                searchPostList: response.data,
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
                    <h2>My Blogs</h2>
                </div>

                <div className="float-right">
                    <Link
                        to={`${PUBLIC_URL}posts/create`}
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

            {post.searchPostList.length === 0 && (
                <Alert variant={"warning"}>
                    No Posts Found !! Please create one...
                </Alert>
            )}

            {post.searchPostList.map((eachPost, index) => (
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

export default withRouter(MyBlog);
