import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import getFundraiser from "../api/get-fundraiser.js";
import getUsers from "../api/get-users.js";
import postPledge from "../api/post-pledge.js";
import PledgeModal from "../components/PledgeModal.jsx";
import "./FundraiserPage.css";

function FundraiserPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { auth } = useAuth();

    const [fundraiser, setFundraiser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPledgeModal, setShowPledgeModal] = useState(false);

// Pledge form state
    const [pledgeError, setPledgeError] = useState("");

    useEffect(() => {
        loadPageData();
    }, [id]);

    const loadPageData = async () => {
        try {
            setLoading(true);
            const [fundraiserData, usersData] = await Promise.all([
                getFundraiser(id),
                auth.token ? getUsers() : Promise.resolve([])
            ]);
            setFundraiser(fundraiserData);
            setUsers(usersData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getSupporterName = (supporterId) => {
        const user = users.find(u => u.id === supporterId);
        return user ? `${user.first_name} ${user.last_name}` : `User #${supporterId}`;
    };

    const isSupporter = () => {
        if (!auth.token || !fundraiser || !auth.user_id) return false;
        // Only supporters can make pledges, NOT the owner
        return fundraiser.supporters?.some(
            (supporterId) => supporterId === auth.user_id
        );
    };


    const handleSubmitPledge = async (formData) => {
    setPledgeError("");

    if (!auth.token) {
        setPledgeError("You must be logged in to make a pledge");
        return;
    }

    if (!isSupporter()) {
        setPledgeError("You must be invited to this fundraiser to make a pledge");
        return;
    }

    try {
        const pledgeData = {
            fundraiser: fundraiser.id,
            type: formData.pledgeType,
        };

        if (formData.pledgeType === "time") {
            pledgeData.hours = parseInt(formData.hours);
        } else {
            pledgeData.action = formData.action;
        }

        if (formData.comment?.trim()) {
            pledgeData.comment = formData.comment;
        }

        await postPledge(pledgeData);
        await loadPageData();
        setShowPledgeModal(false);

    } catch (err) {
        setPledgeError(err.message);
    }
};


    if (loading) {
        return <div className="fundraiser-loading">Loading fundraiser...</div>;
    }

    if (error) {
        return <div className="fundraiser-error">Error: {error}</div>;
    }

    if (!fundraiser) {
        return <div className="fundraiser-error">Fundraiser not found</div>;
    }

    return (
        <div className="fundraiser-page">
            <div className="fundraiser-container">
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn--secondary"
                    style={{ marginBottom: '1rem' }}
                >
                    ← Back
                </button>
                <div className="fundraiser-hero">
                    <div className="fundraiser-hero-content">
                        <h1>{fundraiser.title}</h1>
                        <p className="fundraiser-goal">{fundraiser.goal_text}</p>
                    </div>
                </div>

                <div className="fundraiser-content">
                    <div className="fundraiser-main">
                        <section className="fundraiser-section">
                            <h2>Progress</h2>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${fundraiser.progress}%` }}
                                >
                                    <span className="progress-text">{fundraiser.progress}%</span>
                                </div>
                            </div>
                            <p className="progress-info">
                                {fundraiser.pledges?.length || 0} pledges made
                            </p>
                        </section>

                        <section className="fundraiser-section">
                            <h2>About</h2>
                            <p className="fundraiser-description">{fundraiser.description}</p>
                        </section>

                        <section className="fundraiser-section">
                            <div className="section-header">
                                <h2>Pledges ({fundraiser.pledges?.length || 0})</h2>
                                {auth.token && isSupporter() && (
                                    <button
                                        onClick={() => setShowPledgeModal(true)}
                                        className="btn btn--primary"
                                    >
                                        Make a Pledge
                                    </button>
                                )}
                            </div>

                            {!auth.token && (
                                <div className="info-box info-box--warning">
                                    <p>You need to be logged in and invited to make a pledge.</p>
                                </div>
                            )}

                            {auth.token && !isSupporter() && fundraiser.owner !== auth.user_id && (
                                <div className="info-box info-box--warning">
                                    <p>You need to be invited by the fundraiser owner to make a pledge.</p>
                                </div>
                            )}

                            {fundraiser.pledges && fundraiser.pledges.length > 0 ? (
                                <div className="pledges-list">
                                    {fundraiser.pledges.map((pledge) => (
                                        <div key={pledge.id} className="pledge-card">
                                            <div className="pledge-header">
                                                <span className={`pledge-type pledge-type--${pledge.type}`}>
                                                    {pledge.type === "time" ? "⏰ Time" : "💬 Words"}
                                                </span>
                                                <span className="pledge-date">
                                                    {new Date(pledge.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="pledge-supporter">
                                                <strong>From: {getSupporterName(pledge.supporter)}</strong>
                                            </p>
                                            <div className="pledge-content">
                                                {pledge.type === "time" ? (
                                                    <p className="pledge-value">
                                                        <strong>{pledge.hours} hour{pledge.hours !== 1 ? 's' : ''}</strong> of support
                                                    </p>
                                                ) : (
                                                    <p className="pledge-value">
                                                        <strong>{pledge.action}</strong>
                                                    </p>
                                                )}
                                                {pledge.comment && (
                                                    <p className="pledge-comment">"{pledge.comment}"</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <p>No pledges yet. Be the first to show your support!</p>
                                </div>
                            )}
                        </section>
                    </div>

                    <aside className="fundraiser-sidebar">
                        <div className="sidebar-card">
                            <h3>Fundraiser Info</h3>
                            <div className="info-row">
                                <span className="info-label">Created:</span>
                                <span className="info-value">
                                    {new Date(fundraiser.date_created).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Status:</span>
                                <span className={`status-badge ${fundraiser.is_open ? 'status-open' : 'status-closed'}`}>
                                    {fundraiser.is_open ? "Open" : "Closed"}
                                </span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Supporters:</span>
                                <span className="info-value">{fundraiser.supporters?.length || 0}</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <PledgeModal
                isOpen={showPledgeModal}
                onClose={() => {
                    setPledgeError("");
                    setShowPledgeModal(false);
                }}
                onSubmit={handleSubmitPledge}
                error={pledgeError}

            />
        </div>
    );
}

export default FundraiserPage;
