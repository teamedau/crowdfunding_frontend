async function postFundraiser({ title, description, goal_text, image, checklist }) {
    const url = `${import.meta.env.VITE_API_BASE_URL}/fundraisers/`;
    const token = window.localStorage.getItem("token");

    const body = {
        title: title,
        description: description,
        goal_text: goal_text,
    };

    // Add checklist if provided
    if (checklist && checklist.length > 0) {
        body.checklist = checklist;
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to create fundraiser: ${response.status}`;
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default postFundraiser;
