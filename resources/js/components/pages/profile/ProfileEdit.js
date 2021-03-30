import React, { useState, useEffect } from "react";
import { Card, Button, Spinner, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import { getProfile, updateProfile } from "../../../services/ProfileService";
import { checkIfAuthenticated } from "../../../services/AuthService";

function ProfileEdit(props) {
    /* Initialize the states */
    const [profile, setProfile] = useState({
        userId: "",
        name: "",
        website: "",
        email: "",
        isLoading: false,
    });

    useEffect(() => {
        getProfileDetails();
    }, []);

    /* Get the logged in user profile */
    const getProfileDetails = async () => {
        setProfile({ ...profile, isLoading: true });
        const userId = props.match.params.id;
        const isAuthenticated = checkIfAuthenticated();
        if (isAuthenticated) {
            if (isAuthenticated.id != userId) {
                const { history } = props;
                history.push(`${PUBLIC_URL}profile/${isAuthenticated.id}`);
            }
        }

        /* Sending data to backend for response */
        const res = await getProfile(userId);
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

    /* Change form data as per input */
    const changeInput = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    /* Submit form data using the inputs */
    const submitForm = async (e) => {
        e.preventDefault();
        const { history } = props;

        setProfile({ ...profile, isLoading: true });
        const profileBody = {
            name: profile.name,
            website: profile.website,
        };

        /* Sending data to backend for response */
        const response = await updateProfile(profile.userId, profileBody);
        if (response.success) {
            setProfile({
                ...profile,
                userId: "",
                name: "",
                website: "",
                email: "",
                isLoading: false,
            });
            history.push(`${PUBLIC_URL}profile/${profile.userId}`);
        } else {
            setProfile({
                ...profile,
                errors: response.errors,
                isLoading: false,
            });
        }
    };

    return (
        <>
            <div className="header-part">
                <div className="float-left">
                    <h2>Edit Profile</h2>
                </div>
                <div className="clearfix"></div>
            </div>
            <Card>
                <Card.Body>
                    <Form onSubmit={(e) => submitForm(e)}>
                        <Form.Group controlId="name">
                            <div className="input-group mb-3" style={divStyle}>
                                <div className="input-group-prepend">
                                    <span
                                        className="input-group-text"
                                        style={spanStyleA}
                                    >
                                        Name
                                    </span>
                                    <Form.Control
                                        className="input-group mb-3"
                                        style={spanStyleb}
                                        type="text"
                                        placeholder="Enter Your Name"
                                        value={profile.name}
                                        name="name"
                                        onChange={(e) => changeInput(e)}
                                    />
                                </div>
                            </div>
                        </Form.Group>
                        {profile.errors && profile.errors.name && (
                            <p className="text-danger">
                                {profile.errors.name[0]}
                            </p>
                        )}
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

                        <Form.Group controlId="website">
                            <div className="input-group mb-3" style={divStyle}>
                                <div className="input-group-prepend">
                                    <span
                                        className="input-group-text"
                                        style={spanStyleA}
                                    >
                                        Website
                                    </span>
                                    <Form.Control
                                        className="input-group mb-3"
                                        style={spanStyleb}
                                        type="text"
                                        placeholder="Enter Your Website"
                                        value={profile.website}
                                        name="website"
                                        onChange={(e) => changeInput(e)}
                                    />
                                </div>
                            </div>
                        </Form.Group>
                        {profile.errors && profile.errors.website && (
                            <p className="text-danger">
                                {profile.errors.website[0]}
                            </p>
                        )}

                        {profile.isLoading && (
                            <Button variant="primary" type="button" disabled>
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>{" "}
                                Saving...
                            </Button>
                        )}

                        {!profile.isLoading && (
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        )}
                    </Form>
                </Card.Body>
            </Card>
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

export default ProfileEdit;
