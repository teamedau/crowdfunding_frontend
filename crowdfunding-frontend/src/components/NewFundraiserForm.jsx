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
    const [checklist, setChecklist] = useState([]);
    const [newTask, setNewTask] = useState("");
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

    const handleAddTask = () => {
        if (!newTask.trim()) {
            setError("Task cannot be empty");
            return;
        }
        if (checklist.length >= 10) {
            setError("Maximum 10 tasks allowed");
            return;
        }
        setChecklist([
            ...checklist,
            { id: Date.now(), text: newTask.trim() }
        ]);
        setNewTask("");
        setError("");
    };

    const handleRemoveTask = (taskId) => {
        setChecklist(checklist.filter(task => task.id !== taskId));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTask();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");

        if (!auth.token) {
            navigate("/login");
            return;
        }

        if (!credentials.title.trim() || !credentials.description.trim() || !credentials.goal_text.trim()) {
            setError("All fields are required");
            return;
        }

        const fundraiserData = {
            title: credentials.title,
            description: credentials.description,
            goal_text: credentials.goal_text,
            checklist: checklist.map(task => task.text),
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
                    placeholder="What is this fundraiser for?"
                    value={credentials.title}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="description"><b>Description</b></label>
                <textarea
                    id="description"
                    placeholder="Describe your fundraiser and how the community can help"
                    value={credentials.description}
                    onChange={handleChange}
                    rows="4"
                    required
                />

                <label htmlFor="goal_text"><b>Goal Text</b></label>
                <input
                    type="text"
                    id="goal_text"
                    placeholder="e.g., we are planing to go camping"
                    value={credentials.goal_text}
                    onChange={handleChange}
                    required
                />

                <div style={{ marginTop: '2rem', marginBottom: '2rem', paddingTop: '1.5rem', borderTop: '2px solid #e8eeec' }}>
                    <label htmlFor="new-task"><b>📋 Checklist (Optional)</b></label>
                    <p style={{ fontSize: '0.9rem', color: '#9e9e9e', marginBottom: '1rem' }}>
                        Add tasks or steps for your community to help with
                    </p>
                    
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                        <input
                            type="text"
                            id="new-task"
                            placeholder="list everything you need to reach the goal"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyDown={handleKeyPress}
                            style={{
                                flex: 1,
                                padding: '0.75rem 1rem',
                                border: '2px solid #e8eeec',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontFamily: 'inherit',
                            }}
                        />
                        <button
                            type="button"
                            onClick={handleAddTask}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: '#81c087',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 600,
                                fontSize: '1rem',
                                transition: 'background-color 0.3s',
                            }}
                            onMouseOver={(e) => e.target.style.background = '#6fb076'}
                            onMouseOut={(e) => e.target.style.background = '#81c087'}
                        >
                            + Add
                        </button>
                    </div>

                    {checklist.length > 0 && (
                        <div style={{
                            background: '#f8faf9',
                            border: '2px solid #e8eeec',
                            borderRadius: '8px',
                            padding: '1rem',
                            marginBottom: '1rem',
                        }}>
                            <p style={{ margin: '0 0 0.75rem 0', fontWeight: 600, color: '#2c2c2c' }}>
                                Tasks ({checklist.length})
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {checklist.map((task) => (
                                    <li
                                        key={task.id}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '0.75rem 0',
                                            borderBottom: '1px solid #e8eeec',
                                        }}
                                    >
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <input type="checkbox" disabled style={{ cursor: 'default' }} />
                                            {task.text}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTask(task.id)}
                                            style={{
                                                background: '#e57373',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                padding: '0.25rem 0.75rem',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem',
                                                transition: 'background-color 0.3s',
                                            }}
                                            onMouseOver={(e) => e.target.style.background = '#d96262'}
                                            onMouseOut={(e) => e.target.style.background = '#e57373'}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

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
