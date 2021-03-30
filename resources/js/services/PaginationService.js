/**
 * Check if there is pagination data and send
 */

export const getPaginatedData = () => {
    const getPaginateData = localStorage.getItem("paginateData");
    if (getPaginateData != null) {
        const data = JSON.parse(getPaginateData);
        return data;
    }
    return false;
};
