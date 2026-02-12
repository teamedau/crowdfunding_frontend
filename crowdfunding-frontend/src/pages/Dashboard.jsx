import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import getUserFundraisers from "../api/get-user-fundraisers.js";
import getSupportedFundraisers from "../api/get-supported-fundraisers.js";
import deleteFundraiser from "../api/delete-fundraiser.js";
import updateFundraiser from "../api/update-fundraiser.js";
import getMyInvitations from "../api/get-my-invitations.js";
import searchUsers from "../api/search-users.js";
import postInvitation from "../api/post-invitation.js";
import respondToInvitation from "../api/respond-invitation.js";
import "./Dashboard.css";

function Dashboard() {
    const { auth } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("User");
    const [fundraisers, setFundraisers] = useState([]);
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

  // Edit state
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        title: "",
        description: "",
        goal_text: "",
    });

  // Invite state
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedFundraiser, setSelectedFundraiser] = useState(null);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteMessage, setInviteMessage] = useState("");

    useEffect(() => {
        if (!auth.token) {
            navigate("/login");
            return;
        }

        setUsername(auth.username || "User");

        loadDashboardData();
    }, [auth.token]);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const [ownedFundraisersData, supportedFundraisersData, invitationsData] = await Promise.all([
                getUserFundraisers(),
                getSupportedFundraisers(),
                getMyInvitations(),
            ]);

            // Combine owned and supported fundraisers, avoid duplicates
            const allFundraisers = [...ownedFundraisersData];
            supportedFundraisersData.forEach(supported => {
                if (!allFundraisers.find(f => f.id === supported.id)) {
                    allFundraisers.push(supported);
                }
            });

            setFundraisers(allFundraisers);
            setInvitations(invitationsData);
        } catch (err) {
            console.error(err);
            setError("Error loading dashboard data");
        } finally {
            setLoading(false);
        }
    };

    /* ==FUNDRAISER ACTIONS== */

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this fundraiser?"))
            return;

        try {
            await deleteFundraiser(id);
            setFundraisers((prev) => prev.filter((f) => f.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const startEdit = (fundraiser) => {
        setEditingId(fundraiser.id);
        setEditForm({
            title: fundraiser.title,
            description: fundraiser.description,
            goal_text: fundraiser.goal_text,
        });

    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({ title: "", description: "", goal_text: "" });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (id) => {
        try {
            const updated = await updateFundraiser(id, editForm);
            setFundraisers((prev) =>
                prev.map((f) => (f.id === id ? updated : f))
            );
            cancelEdit();
        } catch (err) {
            setError(err.message);
        }
    };

/* ===INVITATION ACTIONS=== */

    const handleInvitationResponse = async (id, action) => {
        try {
            await respondToInvitation(id, action);
            // Reload all dashboard data to reflect changes
            await loadDashboardData();
            alert(`Invitation ${action}ed successfully!`);
        } catch (err) {
            alert(err.message);
        }
    };

    const handleSearchUsers = async (query) => {
        setSearchQuery(query);

        if (query.length < 2) {
            setSearchResults([]);
            return;
        }

        try {
            const data = await searchUsers(query);
            setSearchResults(data.results);
        } catch (err) {
            console.error("Error searching users:", err);
        }
    };

    const handleSendInvitation = async (userId) => {
        if (!selectedFundraiser) return;

        try {
            await postInvitation(userId, selectedFundraiser.id);
            alert("Invitation sent successfully!");
            setSearchResults([]);
            setSearchQuery("");
        } catch (err) {
            alert(err.message);
        }
    };

    const generateInviteLink = () =>
        `${window.location.origin}/register`;

    const copyInviteMessage = () => {
        const message = `Hi! Would you like to grow our community together?.

Join here: ${generateInviteLink()}

Once you create an account, I'll invite you to my community!`;

        navigator.clipboard.writeText(message);
        setInviteMessage("Copied to clipboard!");
        setTimeout(() => setInviteMessage(""), 3000);
    };

    if (loading) return <div className="dashboard-loading">Loading...</div>;

    return (
        <div className="dashboard">
            <div className="dashboard-container">
                <header className="dashboard-header">
                    <h1>Welcome {username}!</h1>
                    <button
                        onClick={() => navigate("/new-fundraiser")}
                        className="btn btn--primary"
                    >
                        Create New Fundraiser
                    </button>
                </header>

                {error && <div className="error-message">{error}</div>}

                {invitations.length > 0 && (
                    <section className="dashboard-section">
                        <h2>Pending Invitations ({invitations.length})</h2>
                        {invitations.map((inv) => (
                            <div key={inv.id} className="invitation-card">
                                <h3>{inv.fundraiser_title}</h3>
                                <p>
                                    Invited by {inv.invited_by.first_name}{" "}
                                    {inv.invited_by.last_name}
                                </p>
                                <button
                                    onClick={() => handleInvitationResponse(inv.id, "accept")}
                                    className="btn btn--success"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleInvitationResponse(inv.id, "reject")}
                                    className="btn btn--danger"
                                >
                                    Decline
                                </button>
                            </div>
                        ))}
                    </section>
                )}


                <section className="dashboard-section">
                    <h2>My Fundraisers</h2>

                    {fundraisers.length === 0 ? (
                        <p>You haven't created any fundraisers yet.</p>
                    ) : (
                        <div className="fundraisers-grid">
                            {fundraisers.map((f) => (
                                <div key={f.id} className="fundraiser-card">
                                    <div className="fundraiser-card-banner"></div>

                                    {editingId === f.id ? (
                                        <>
                                            <input
                                                name="title"
                                                value={editForm.title}
                                                onChange={handleEditChange}
                                            />
                                            <textarea
                                                name="description"
                                                value={editForm.description}
                                                onChange={handleEditChange}
                                            />
                                            <input
                                                name="goal_text"
                                                value={editForm.goal_text}
                                                onChange={handleEditChange}
                                            />
                                            <button onClick={() => handleUpdate(f.id)}>
                                                Save
                                            </button>
                                            <button onClick={cancelEdit}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <h3>{f.title}</h3>
                                            <p>{f.description}</p>
                                            <p>Goal: {f.goal_text}</p>
                                            <p>Progress: {f.progress}%</p>

                                            <div className="card-actions">
                                                {f.owner === auth.user_id && (
                                                    <>
                                                        <button onClick={() => startEdit(f)} className="btn btn-edit">
                                                            Edit
                                                        </button>
                                                        <button onClick={() => handleDelete(f.id)} className="btn btn-delete">
                                                            Delete
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedFundraiser(f);
                                                                setShowInviteModal(true);
                                                            }}
                                                            className="btn btn--primary"
                                                        >
                                                            Invite People
                                                        </button>
                                                    </>
                                                )}
                                                <button
                                                    onClick={() =>
                                                        navigate(`/fundraiser/${f.id}`)
                                                    }
                                                    className="btn btn-view"
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>


            {showInviteModal && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowInviteModal(false)}
                >
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                            <h2>Invite to {selectedFundraiser?.title}</h2>

                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchQuery}
                                onChange={(e) =>
                                    handleSearchUsers(e.target.value)
                                }
                            />

                            {searchResults.map((user) => (
                                <div key={user.id}>
                                    {user.first_name} {user.last_name}
                                    <button
                                        onClick={() =>
                                            handleSendInvitation(user.id)
                                        }
                                    >
                                        Invite
                                    </button>
                                </div>
                            ))}

                            <hr />

                            <button onClick={copyInviteMessage}>
                                Copy Invite Message
                            </button>
                            {inviteMessage && <span>{inviteMessage}</span>}
                    </div>
                </div>
            )}
        </div>
    );
}


export default Dashboard;
