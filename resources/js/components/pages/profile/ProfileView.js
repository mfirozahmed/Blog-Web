import React, { useState, useEffect, createContext } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import { getProfile } from "../../../services/ProfileService";
import { getUserPostList } from "../../../services/PostService";
import { checkIfAuthenticated } from "../../../services/AuthService";
import PostUser from "../posts/PostUser";

const postsList = createContext();

function ProfileView(props) {
    /* Initialize the states */
    const [profile, setProfile] = useState({
        userId: "",
        name: "",
        website: "",
        email: "",
        post: [],
        isLoading: false,
        authenticatedUserId: "",
    });

    useEffect(() => {
        getProfileDetails();
    }, []);

    /* Get profile info */
    const getProfileDetails = async () => {
        setProfile({ ...profile, isLoading: true });
        let userId = props.match.params.id;
        const isAuthenticated = checkIfAuthenticated();
        if (isAuthenticated) {
            setProfile({
                ...profile,
                authenticatedUserId: isAuthenticated.id,
            });
        }

        /* Sending request to backend for profile and posts */
        const res1 = await getProfile(userId);
        const res2 = await getUserPostList(userId);
        setProfile({
            ...profile,
            userId: userId,
            name: res1.data.name,
            website: res1.data.website,
            email: res1.data.email,
            username: res1.data.username,
            post: res2.data,
            isLoading: false,
        });
    };

    return (
        <>
            <div className="header-part">
                <div className="float-left">
                    <h2>Profile</h2>
                </div>
                <div className="clearfix"></div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div
                        className="input-group mb-3"
                        style={{
                            width: "700px",
                        }}
                    >
                        <div className="input-group-prepend">
                            <span
                                className="input-group-text"
                                style={{
                                    width: "200px",
                                }}
                            >
                                Name
                            </span>
                            <span
                                className="input-group-text"
                                style={{
                                    width: "500px",
                                }}
                            >
                                {profile.name}
                            </span>
                        </div>
                    </div>

                    <div
                        className="input-group mb-3"
                        style={{
                            width: "700px",
                        }}
                    >
                        <div className="input-group-prepend">
                            <span
                                className="input-group-text"
                                style={{
                                    width: "200px",
                                }}
                            >
                                Username
                            </span>
                            <span
                                className="input-group-text"
                                style={{
                                    width: "500px",
                                }}
                            >
                                {profile.username}
                            </span>
                        </div>
                    </div>

                    <div
                        className="input-group mb-3"
                        style={{
                            width: "700px",
                        }}
                    >
                        <div className="input-group-prepend">
                            <span
                                className="input-group-text"
                                style={{
                                    width: "200px",
                                }}
                            >
                                Email
                            </span>
                            <span
                                className="input-group-text"
                                style={{
                                    width: "500px",
                                }}
                            >
                                {profile.email}
                            </span>
                        </div>
                    </div>

                    <div
                        className="input-group mb-3"
                        style={{
                            width: "700px",
                        }}
                    >
                        <div className="input-group-prepend">
                            <span
                                className="input-group-text"
                                style={{
                                    width: "200px",
                                }}
                            >
                                Website
                            </span>
                            <span
                                className="input-group-text"
                                style={{
                                    width: "500px",
                                }}
                            >
                                {profile.website}
                            </span>
                        </div>
                    </div>

                    {/* If logged in user id and profile user id is same, show button */}
                    {profile.userId == profile.authenticatedUserId && (
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <Link
                                    to={`${PUBLIC_URL}profile/edit/${profile.userId}`}
                                    className="btn btn-info"
                                >
                                    Update
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Sending post data using context api */}
            <postsList.Provider value={profile.post}>
                <PostUser />
            </postsList.Provider>
        </>
    );
}

export default withRouter(ProfileView);
export { postsList };
