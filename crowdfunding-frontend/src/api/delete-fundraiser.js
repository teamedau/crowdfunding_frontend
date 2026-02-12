async function deleteFundraiser(fundraiserId) {
    const url = `${import.meta.env.VITE_API_BASE_URL}/fundraisers/${fundraiserId}/`;
    const token = window.localStorage.getItem("token");

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${token}`,
        },
    });

    if (!response.ok && response.status !== 204) {
        const fallbackError = `Error deleting fundraiser: ${response.status}`;
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return true;
}

export default deleteFundraiser;
