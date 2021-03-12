import { Table, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { PUBLIC_URL } from "../../constants";
import { getProfiles, customizedProfile } from "../../services/ProfileService";

const Users = () => {
    const [profile, setProfile] = useState({
        isLoading: false,
        searchText: "",
        searchProfileList: [],
        profileList: [],
    });
    const [sort, setSort] = useState({
        name: "asc",
        username: "asc",
        email: "asc",
        website: "asc",
    });
    useEffect(() => {
        getAllProfiles();
    }, []);

    const getAllProfiles = async () => {
        setProfile({ ...profile, isLoading: true });
        const data = {
            column: "name",
            order: "asc",
        };
        const response = await getProfiles(data);
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
    };
    const clickedColumn = async (column) => {
        let data = "";
        if (column == "name") {
            if (sort.name == "asc") {
                setSort({
                    ...sort,
                    name: "desc",
                });
            } else {
                setSort({
                    ...sort,
                    name: "asc",
                });
            }
            data = {
                column: "name",
                order: sort.name,
            };
        } else if (column == "username") {
            if (sort.username == "asc") {
                setSort({
                    ...sort,
                    username: "desc",
                });
            } else {
                setSort({
                    ...sort,
                    username: "asc",
                });
            }
            data = {
                column: "username",
                order: sort.username,
            };
        } else if (column == "email") {
            if (sort.email == "asc") {
                setSort({
                    ...sort,
                    email: "desc",
                });
            } else {
                setSort({
                    ...sort,
                    email: "asc",
                });
            }
            data = {
                column: "email",
                order: sort.email,
            };
        } else {
            if (sort.website == "asc") {
                setSort({
                    ...sort,
                    website: "desc",
                });
            } else {
                setSort({
                    ...sort,
                    website: "asc",
                });
            }
            data = {
                column: "website",
                order: sort.website,
            };
        }
        const response = await customizedProfile(data);
        console.log(response);
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
    };

    const onSearch = (e) => {
        const searchText = e.target.value;
        console.log("intial:" + searchText);
        setProfile({
            ...profile,
            isLoading: true,
        });
        if (searchText.length > 0) {
            const searchData = profile.profileList.filter((profile) => {
                const profileData =
                    profile.name +
                    " " +
                    profile.username +
                    " " +
                    profile.email +
                    " " +
                    profile.website;
                const textData = searchText.trim().toLowerCase();
                console.log("next:" + textData);
                return (
                    profileData.trim().toLowerCase().indexOf(textData) !== -1
                );
            });
            setProfile({
                ...profile,
                searchProfileList: searchData,
                searchText: searchText,
                isLoading: false,
            });
        } else {
            setProfile({
                ...profile,
                searchText: "",
            });
            getAllProfiles();
        }
    };
    return (
        <>
            <div className="header-part">
                <div className="float-left">
                    <h2>User's Info</h2>
                </div>
                <div className="float-left text-center ml-5">
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Type to Search..."
                            aria-label="Type to Search..."
                            aria-describedby="basic-addon2"
                            onChange={(e) => onSearch(e)}
                        />
                    </InputGroup>
                </div>
                <div className="clearfix"></div>
            </div>

            <Table className="text-center mt-3">
                <thead>
                    <tr>
                        <th onClick={() => clickedColumn("name")}>Name</th>
                        <th onClick={() => clickedColumn("username")}>
                            Username
                        </th>
                        <th onClick={() => clickedColumn("email")}>Email</th>
                        <th onClick={() => clickedColumn("website")}>
                            Website
                        </th>
                    </tr>
                </thead>
                {!profile.searchText ? (
                    <tbody>
                        {profile.profileList.map((eachProfile, index) => (
                            <tr key={index}>
                                <td>
                                    <Link
                                        to={`${PUBLIC_URL}profile/${eachProfile.user_id}`}
                                    >
                                        {eachProfile.name}
                                    </Link>
                                </td>
                                <td>{eachProfile.username}</td>
                                <td>{eachProfile.email}</td>
                                <td>{eachProfile.website}</td>
                            </tr>
                        ))}
                    </tbody>
                ) : null}
                {profile.searchText ? (
                    <tbody>
                        {profile.searchProfileList.map((eachProfile, index) => (
                            <tr key={index}>
                                <td>
                                    <Link
                                        to={`${PUBLIC_URL}profile/${eachProfile.user_id}`}
                                    >
                                        {eachProfile.name}
                                    </Link>
                                </td>
                                <td>{eachProfile.username}</td>
                                <td>{eachProfile.email}</td>
                                <td>{eachProfile.website}</td>
                            </tr>
                        ))}
                    </tbody>
                ) : null}
            </Table>
        </>
    );
};

export default Users;
