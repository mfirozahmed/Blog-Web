import React, { useEffect, useState, createContext } from "react";
import { Table, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../../constants";
import { getProfiles, customizedProfile } from "../../services/ProfileService";
import { getPaginatedData } from "../../services/PaginationService";
import Pagination from "../layouts/Pagination";

const paginationList = createContext();

const Users = () => {
    /* Initialize the states */
    const [profile, setProfile] = useState({
        isLoading: false,
        searchText: "",
        searchProfileList: [],
        profileList: [],
    });
    const [sort, setSort] = useState({
        name: "asc",
        email: "asc",
        website: "asc",
    });
    const [paginate, setPaginate] = useState({
        currentPage: 1,
        userPerPage: 3,
    });

    useEffect(() => {
        getAllProfiles();
    }, []);

    /* Get all the profiles */
    const getAllProfiles = async () => {
        setProfile({ ...profile, isLoading: true });
        const data = {
            column: "name",
            order: "asc",
        };

        /* Sending request to backend for data */
        const response = await getProfiles(data);
        if (response.success) {
            setProfile({
                ...profile,
                profileList: response.data,
                isLoading: false,
            });

            /* Get pagination data */
            const paginateData = getPaginatedData();
            if (!paginateData) {
                const paginationResponse = {
                    currentPage: paginate.currentPage,
                    userPerPage: paginate.userPerPage,
                };

                /* Store pagination data in storage */
                localStorage.setItem(
                    "paginateData",
                    JSON.stringify(paginationResponse)
                );
            } else {
                setPaginate({
                    currentPage: paginateData.currentPage,
                    userPerPage: paginateData.userPerPage,
                });
            }
        } else {
            setProfile({
                ...profile,
                isLoading: false,
            });
        }
    };

    /* Sort the data table based on different columns */
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

        /* Sending request to backend for data */
        const response = await customizedProfile(data);
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

    /* Search anything in the table */
    const onSearch = (e) => {
        const searchText = e.target.value;
        setProfile({
            ...profile,
            isLoading: true,
        });

        /* If there is any char in the search box, search that and save the result */
        if (searchText.length > 0) {
            const searchData = profile.profileList.filter((profile) => {
                const profileData =
                    profile.name + " " + profile.email + " " + profile.website;
                const textData = searchText.trim().toLowerCase();
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

            /* If seach box is empty then get all the profiles */
            getAllProfiles();
        }
    };

    /* Set pagination information */
    const indexOfLastUser = paginate.currentPage * paginate.userPerPage;
    const indexOfFirstUser = indexOfLastUser - paginate.userPerPage;
    const currentUsers = profile.profileList.slice(
        indexOfFirstUser,
        indexOfLastUser
    );

    /* Page change based on page number */
    const pageChange = (pageNumber) => {
        setPaginate({ ...paginate, currentPage: pageNumber });
        const paginationResponse = {
            currentPage: pageNumber,
            userPerPage: paginate.userPerPage,
        };

        /* Store pagination data after page value change */
        localStorage.setItem(
            "paginateData",
            JSON.stringify(paginationResponse)
        );
    };

    /* Per page change based on per page number */
    const onPerPage = (e) => {
        const userPerPage = e.target.value;
        setPaginate({ ...paginate, userPerPage: userPerPage });
        const paginationResponse = {
            currentPage: paginate.currentPage,
            userPerPage: userPerPage,
        };

        /* Store pagination data after per page value change */
        localStorage.setItem(
            "paginateData",
            JSON.stringify(paginationResponse)
        );
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
                <div className="float-right text-center ml-5">
                    <div className="dropdown">
                        <button
                            className="btn dropdown-toggle"
                            type="button"
                            id="perPage"
                            data-toggle="dropdown"
                        >
                            Per Page
                        </button>
                        <div className="dropdown-menu">
                            <option
                                className={
                                    paginate.userPerPage == 3
                                        ? "dropdown-item active"
                                        : "dropdown-item"
                                }
                                value="3"
                                type="button"
                                onClick={(e) => onPerPage(e)}
                            >
                                3 per page
                            </option>
                            <option
                                className={
                                    paginate.userPerPage == 5
                                        ? "dropdown-item active"
                                        : "dropdown-item"
                                }
                                value="5"
                                type="button"
                                onClick={(e) => onPerPage(e)}
                            >
                                5 per page
                            </option>
                            <option
                                className={
                                    paginate.userPerPage == 7
                                        ? "dropdown-item active"
                                        : "dropdown-item"
                                }
                                value="7"
                                type="button"
                                onClick={(e) => onPerPage(e)}
                            >
                                7 per page
                            </option>
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>
            </div>
            <Table className="text-center mt-3">
                <thead>
                    <tr>
                        <th
                            onClick={() => clickedColumn("name")}
                            style={{ cursor: "pointer" }}
                        >
                            <h4>Name</h4>
                        </th>
                        <th
                            onClick={() => clickedColumn("email")}
                            style={{ cursor: "pointer" }}
                        >
                            <h4>Email</h4>
                        </th>
                        <th
                            onClick={() => clickedColumn("website")}
                            style={{ cursor: "pointer" }}
                        >
                            <h4>Website</h4>
                        </th>
                    </tr>
                </thead>

                {/* If the seach box is empty */}
                {!profile.searchText ? (
                    <tbody>
                        {currentUsers.map((eachProfile, index) => (
                            <tr key={index}>
                                <td>
                                    <Link
                                        to={`${PUBLIC_URL}profile/${eachProfile.user_id}`}
                                    >
                                        {eachProfile.name}
                                    </Link>
                                </td>
                                <td>{eachProfile.email}</td>
                                <td>{eachProfile.website}</td>
                            </tr>
                        ))}
                    </tbody>
                ) : null}

                {/* If there is char in search box */}
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
                                <td>{eachProfile.email}</td>
                                <td>{eachProfile.website}</td>
                            </tr>
                        ))}
                    </tbody>
                ) : null}
            </Table>
            {/* Sending pagination data using context api */}
            <paginationList.Provider
                value={{
                    usersPerPage: paginate.userPerPage,
                    totalUsers: profile.profileList.length,
                    currentPage: paginate.currentPage,
                }}
            >
                <Pagination pageChange={pageChange} />
            </paginationList.Provider>
            ;
        </>
    );
};

export default Users;
export { paginationList };
