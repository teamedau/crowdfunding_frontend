async function postInvitation(userId, fundraiserId) {
    const url = `${import.meta.env.VITE_API_BASE_URL}/invite/`;
    const token = window.localStorage.getItem("token");

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        },
        body: JSON.stringify({
            user_id: userId,
            fundraiser_id: fundraiserId,
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error sending invitation`;
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default postInvitation;
