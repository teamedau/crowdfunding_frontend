async function getSupportedFundraisers() {
    const url = `${import.meta.env.VITE_API_BASE_URL}/fundraisers/`;
    const token = window.localStorage.getItem("token");
    const userId = window.localStorage.getItem("user_id");

    if (!token || !userId) {
        throw new Error("User not authenticated");
    }

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Token ${token}`,
        },
    });

    if (!response.ok) {
        const fallbackError = `Error fetching supported fundraisers`;
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    const allFundraisers = await response.json();

    // Filter fundraisers where the user is a supporter
    const userIdNum = parseInt(userId);
    const supportedFundraisers = allFundraisers.filter(fundraiser =>
        fundraiser.supporters.includes(userIdNum)
    );

    return supportedFundraisers;
}

export default getSupportedFundraisers;
