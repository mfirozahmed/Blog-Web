import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import CommentList from "../comments/CommentList";
import { PUBLIC_URL } from "../../../constants";
import { showPost, deletePost } from "../../../services/PostService";
import { checkIfAuthenticated } from "../../../services/AuthService";

const PostView = (props) => {
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

    const getPostDetails = async () => {
        setPost({ ...post, isLoading: true });
        const postId = props.match.params.id;
        const res = await showPost(postId);
        const isAuthenticated = checkIfAuthenticated();
        let userId = "";
        if (isAuthenticated) {
            userId = isAuthenticated.id;
        }
        //console.log(userId);
        console.log(res.data);
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

    const clickDeletePost = async (id) => {
        const response = await deletePost(id);
        //console.log(response);
        if (response.success) {
            const { history } = props;
            history.push(`${PUBLIC_URL}`);
        } else {
            alert("Sorry, Something is wrong.");
        }
    };

    return (
        <>
            <div className="header-part">
                <div className="float-left">
                    <h1>{post.postDetails.title}</h1>
                    <h4>{post.postDetails.description}</h4>
                </div>
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

            <CommentList
                commentList={post.commentList}
                history={props.history}
                match={props.match}
                // isDetailsView={true}
                //onEditTask={this.onEditTask}
            />
        </>
    );
};

export default PostView;
