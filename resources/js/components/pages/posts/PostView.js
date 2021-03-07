import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import { showPost } from "../../../services/PostService";
import { checkIfAuthenticated } from "../../../services/AuthService";

const PostView = (props) => {
    const [post, setPost] = useState({
        userId: "",
        postId: "",
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
        //console.log(res);
        const isAuthenticated = checkIfAuthenticated();
        let userId = "";
        if (isAuthenticated) {
            userId = isAuthenticated.id;
        }
        //console.log("Postview: " + res.data.msg);
        setPost({
            ...post,
            userId: userId,
            postId: postId,
            commentList: res.data.comments,
            postDetails: res.data.post,
            isLoading: false,
        });
    };

    return (
        <>
            <div className="header-part">
                <div className="float-left">
                    <h2>{post.postDetails.title}</h2>
                    <div>{post.postDetails.description}</div>
                </div>
                <div className="float-right">
                    <Link
                        to={`${PUBLIC_URL}post/edit/${post.postId}`}
                        className="btn btn-danger"
                    >
                        Edit
                    </Link>
                </div>
                <div className="clearfix"></div>
            </div>

            {/* {post.toggleAddTask && (
                <TaskCreate
                    project_id={props.match.params.id}
                    onCompleteTaskCreate={onCompleteTaskCreate()}
                />
            )} */}

            {post.isLoading && (
                <div className="text-center mt-5">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            )}

            {/* <TaskList
                taskList={post.searchTaskList}
                isDetailsView={true}
                onEditTask={onEditTask()}
            /> */}
        </>
    );
};

export default PostView;
