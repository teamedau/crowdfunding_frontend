async function searchUsers(query) {
    const url = `${import.meta.env.VITE_API_BASE_URL}/search-users/?q=${encodeURIComponent(query)}`;
    const token = window.localStorage.getItem("token");

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Token ${token}`,
        },
    });

    if (!response.ok) {
        const fallbackError = `Error searching users`;
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default searchUsers;
