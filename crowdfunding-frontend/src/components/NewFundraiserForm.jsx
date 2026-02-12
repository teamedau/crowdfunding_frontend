import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postFundraiser from "../api/post-fundraiser";
import { useAuth } from "../hooks/use-auth.js";
import "./LayoutTemplate.css";

function NewFundraiserForm() {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [credentials, setCredentials] = useState({
        title: "",
        description: "",
        goal_text: "",
        pledge_types: {
            time: true,
            words: true,
        },
    });
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handlePledgeTypeChange = (type) => {
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            pledge_types: {
                ...prevCredentials.pledge_types,
                [type]: !prevCredentials.pledge_types[type],
            },
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");

        // Check if user is authenticated
        if (!auth.token) {
            setError("You must be logged in to create a fundraiser. Please login or create an account first.");
            return;
        }

        // Validate required fields
        if (!credentials.title.trim() || !credentials.description.trim() || !credentials.goal_text.trim()) {
            setError("All fields are required");
            return;
        }

        // Only send the basic fields to the backend
        const fundraiserData = {
            title: credentials.title,
            description: credentials.description,
            goal_text: credentials.goal_text,
        };

        postFundraiser(fundraiserData)
        .then((response) => {
            console.log("Fundraiser created:", response);
            navigate("/dashboard");
        })
        .catch((error) => {
            console.error("Error creating fundraiser:", error);
            setError(error.message);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <h2>Create New Fundraiser</h2>
            
                {error && <div className="error-message">{error}</div>}
            
                <label htmlFor="title"><b>Title</b></label>
                <input
                    type="text"
                    id="title"
                    placeholder="Enter fundraiser title"
                    value={credentials.title}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="description"><b>Description</b></label>
                <textarea
                    id="description"
                    placeholder="Describe your fundraiser"
                    value={credentials.description}
                    onChange={handleChange}
                    rows="4"
                    required
                />

                <label htmlFor="goal_text"><b>Goal Text</b></label>
                <input
                    type="text"
                    id="goal_text"
                    placeholder="e.g., 100 hours of volunteering"
                    value={credentials.goal_text}
                    onChange={handleChange}
                    required
                />

                <fieldset>
                    <legend><b>Accept Pledge Types</b></legend>
                    <label style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <input
                            type="checkbox"
                            checked={credentials.pledge_types.time}
                            onChange={() => handlePledgeTypeChange('time')}
                        />
                        <span style={{ marginLeft: '0.5rem' }}>⏰ Time Pledges (hours of support)</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="checkbox"
                            checked={credentials.pledge_types.words}
                            onChange={() => handlePledgeTypeChange('words')}
                        />
                        <span style={{ marginLeft: '0.5rem' }}>💬 Word Pledges (actions/skills)</span>
                    </label>
                </fieldset>

                <button type="submit">Create Fundraiser</button>
            </div>
        </form>
    );
}

export default NewFundraiserForm;
