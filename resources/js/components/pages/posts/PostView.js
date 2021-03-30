import React, { useState, useEffect, createContext } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import CommentList from "../comments/CommentList";
import { PUBLIC_URL } from "../../../constants";
import { showPost, deletePost } from "../../../services/PostService";
import { checkIfAuthenticated } from "../../../services/AuthService";

const commentsList = createContext();

const PostView = ({ history, match }) => {
    /* Initialize the states */
    const [post, setPost] = useState({
        userId: "",
        postId: "",
        postUserId: "",
        postDetails: {},
        commentList: [],
        isLoading: false,
    });

    useEffect(() => {
        getPostDetails();
    }, []);

    /* Get the details of a post */
    const getPostDetails = async () => {
        setPost({ ...post, isLoading: true });

        const postId = match.params.id;
        const res = await showPost(postId);

        const isAuthenticated = checkIfAuthenticated();
        let userId = "";
        if (isAuthenticated) {
            userId = isAuthenticated.id;
        }

        setPost({
            ...post,
            userId: userId,
            postId: postId,
            postUserId: res.data.post.user_id,
            commentList: res.data.comments,
            postDetails: res.data.post,
            isLoading: false,
        });
    };

    /* Delete own post using post id*/
    const clickDeletePost = async (id) => {
        const response = await deletePost(id);
        if (response.success) {
            history.push(`${PUBLIC_URL}`);
        } else {
            alert("Sorry, Something is wrong.");
            history.push(`${PUBLIC_URL}`);
        }
    };

    return (
        <>
            <div className="header-part">
                <div className="float-left">
                    <h1>{post.postDetails.title}</h1>
                    <h4>{post.postDetails.description}</h4>
                </div>
                {/* If logged in user id and post user if is same, then show the buttons */}
                {post.userId == post.postUserId && (
                    <>
                        <div className="float-right">
                            <Button
                                variant="danger"
                                onClick={() => clickDeletePost(post.postId)}
                            >
                                Delete
                            </Button>
                        </div>
                        <div className="float-right mr-2">
                            <Link
                                to={`${PUBLIC_URL}post/edit/${post.postId}`}
                                className="btn btn-info"
                            >
                                Edit
                            </Link>
                        </div>
                    </>
                )}
                <div className="clearfix"></div>
            </div>

            {post.isLoading && (
                <div className="text-center mt-5">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            )}

            {/* Sending comment data using context api */}
            <commentsList.Provider value={post.commentList}>
                <CommentList />
            </commentsList.Provider>
        </>
    );
};

export default withRouter(PostView);
export { commentsList };
