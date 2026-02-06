async function getFundraisers() {
    const url = `${import.meta.env.VITE_API_BASE_URL}/fundraisers`;
    const response = await fetch(url, {method: 'GET'});
    if (!response.ok) {
        const fallbackError = "Error to fetch fundraisers";

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.message || fallbackError;
        throw new Error(errorMessage);
    }

    console.log(response);

    return await response.json();
}
export default getFundraisers;



