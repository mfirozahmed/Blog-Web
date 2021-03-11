import { Card, Button, Spinner, Alert, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { PUBLIC_URL } from "../../constants";
import { getProfiles } from "../../services/ProfileService";

const Users = () => {
    const [profile, setProfile] = useState({
        isLoading: false,
        profileList: [],
    });
    useEffect(() => {
        getAllProfiles();
    }, []);

    const getAllProfiles = async () => {
        setProfile({ ...profile, isLoading: true });
        const response = await getProfiles();
        if (response.success) {
            setProfile({
                ...profile,
                profileList: response.data,
                isLoading: false,
            });
        } else {
            setProfile({
                ...profile,
                isLoading: false,
            });
        }

        console.log(response.data);
    };

    return (
        <>
            <div className="header-part">
                <div className="float-left">
                    <h2>User's Info</h2>
                </div>
                <div className="clearfix"></div>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>username</th>
                        <th>email</th>
                        <th>website</th>
                    </tr>
                </thead>
                <tbody>
                    {profile.profileList.map((eachProfile, index) => (
                        <tr key={index}>
                            <td>{eachProfile.name}</td>
                            <td>{eachProfile.name}</td>
                            <td>{eachProfile.name}</td>
                            <td>{eachProfile.website}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default Users;
