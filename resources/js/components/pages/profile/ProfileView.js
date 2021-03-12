import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import { getProfile } from "../../../services/ProfileService";
import { checkIfAuthenticated } from "../../../services/AuthService";

function ProfileView(props) {
    const [profile, setProfile] = useState({
        userId: "",
        name: "",
        website: "",
        email: "",
        isLoading: false,
        authenticatedUserId: "",
    });

    useEffect(() => {
        getProfileDetails();
    }, []);

    const getProfileDetails = async () => {
        setProfile({ ...profile, isLoading: true });
        let userId = props.match.params.id;
        console.log(userId);
        const isAuthenticated = checkIfAuthenticated();
        if (isAuthenticated) {
            setProfile({
                ...profile,
                authenticatedUserId: isAuthenticated.id,
            });
        }
        console.log(userId);
        const res = await getProfile(userId);

        //console.log(res.data);
        setProfile({
            ...profile,
            userId: userId,
            name: res.data.name,
            website: res.data.website,
            email: res.data.email,
            username: res.data.username,
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
                    <div className="input-group mb-3" style={divStyle}>
                        <div className="input-group-prepend">
                            <span
                                className="input-group-text"
                                style={spanStyleA}
                            >
                                Name
                            </span>
                            <span
                                className="input-group-text"
                                style={spanStyleb}
                            >
                                {profile.name}
                            </span>
                        </div>
                    </div>

                    <div className="input-group mb-3" style={divStyle}>
                        <div className="input-group-prepend">
                            <span
                                className="input-group-text"
                                style={spanStyleA}
                            >
                                Username
                            </span>
                            <span
                                className="input-group-text"
                                style={spanStyleb}
                            >
                                {profile.username}
                            </span>
                        </div>
                    </div>

                    <div className="input-group mb-3" style={divStyle}>
                        <div className="input-group-prepend">
                            <span
                                className="input-group-text"
                                style={spanStyleA}
                            >
                                Email
                            </span>
                            <span
                                className="input-group-text"
                                style={spanStyleb}
                            >
                                {profile.email}
                            </span>
                        </div>
                    </div>

                    <div className="input-group mb-3" style={divStyle}>
                        <div className="input-group-prepend">
                            <span
                                className="input-group-text"
                                style={spanStyleA}
                            >
                                Website
                            </span>
                            <span
                                className="input-group-text"
                                style={spanStyleb}
                            >
                                {profile.website}
                            </span>
                        </div>
                    </div>

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
        </>
    );
}

const divStyle = {
    width: "700px",
};
const spanStyleA = {
    width: "200px",
};
const spanStyleb = {
    width: "500px",
};

export default ProfileView;
