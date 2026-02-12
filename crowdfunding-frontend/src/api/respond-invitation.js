async function respondToInvitation(invitationId, action) {
    const url = `${import.meta.env.VITE_API_BASE_URL}/invitations/${invitationId}/action/`;
    const token = window.localStorage.getItem("token");

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        },
        body: JSON.stringify({
            action: action, // 'accept' or 'reject'
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error responding to invitation`;
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default respondToInvitation;
