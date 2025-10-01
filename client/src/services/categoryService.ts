const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const get_categories = async () => {
    const response = await fetch(`${BACKEND_URL}/categories`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }
    return await response.json();
};
export { get_categories };