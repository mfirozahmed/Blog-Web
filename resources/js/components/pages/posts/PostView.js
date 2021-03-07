import React, { useState, useEffect } from "react";
import {
    Card,
    Button,
    Badge,
    Spinner,
    InputGroup,
    FormControl,
    Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import { PUBLIC_URL } from "../../../constants";
import ProjectEdit from "./PostEdit";

const PostView = (props) => {
    const [post, setPost] = useState({
        postDetails: {},
        commentList: [],
        isLoading: false,

        toggleAddTask: false,
        toggleEditProject: false,

        searchText: "",
    });

    useEffect(() => {
        getProjectDetails();
    }, []);

    const getProjectDetails = async () => {
        setPost({ ...post, isLoading: true });
        const res = await Axios.get(
            `http://127.0.0.1:8000/api/posts/${props.match.params.id}`
        );
        setPost({
            ...post,
            commentList: res.data.comments,
            postDetails: res.data.post,
            isLoading: false,
        });
    };

    const toggleAddTask = () => {
        alert("ok");
    };

    return (
        <>
            <div className="header-part">
                <div className="float-left">
                    {!post.toggleEditProject && (
                        <>
                            <h2>{post.postDetails.title}</h2>
                            <div>{post.postDetails.description}</div>
                        </>
                    )}
                </div>
                <div className="float-right">
                    <Button
                        className="btn btn-info mr-2"
                        onClick={() => toggleAddTask()}
                    >
                        {!post.toggleAddTask && <span>+ Add Task</span>}
                        {post.toggleAddTask && <span>Cancel Adding</span>}
                    </Button>
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
