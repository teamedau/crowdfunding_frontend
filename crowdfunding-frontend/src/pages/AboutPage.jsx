import { Link } from "react-router-dom";
import "./AboutPage.css";

function AboutPage() {
    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="container">
                    <h1 className="title-display">About Twogether</h1>
                    <p className="hero-subtitle">
                        Building communities through meaningful actions, not money
                    </p>
                </div>
            </section>
            <section className="mission-section">
                <div className="container container--narrow">
                    <div className="mission-card">
                        <h2 className="title-xl text-center">Our Mission</h2>
                        <p className="text-lg">
                            In a hyper-connected world where loneliness is rising, Twogther
                            creates a space for <strong>real community</strong>. We believe
                            that sometimes what we need most isn't money, it's{" "}
                            <strong>time</strong>, <strong>presence</strong>, and{" "}
                            <strong>meaningful support</strong> from the people closest to us.
                        </p>
                        <p className="text-lg">
                        Twogther makes care visible, showing how our friends, family, and
                        close communities show up, help, and grow together.
                        </p>
                    </div>
                </div>
            </section>
            <section className="how-works-detailed">
                <div className="container">
                    <h2 className="title-xl text-center mb-8">How Twogther Works</h2>
                    <div className="process-timeline">
                        <div className="timeline-item">
                            <div className="timeline-marker">1</div>
                            <div className="timeline-content">
                                <h3>🌱 Create Your Careraiser</h3>
                                <p>
                                Share what you need help with. Maybe it's time to help with a
                                project, support during a difficult period, or specific skills
                                you need. Describe your situation in your own words, this is
                                your story.
                                </p>
                                <div className="example-box">
                                    <strong>Example:</strong> "I'm moving to a new apartment and
                                    need help packing and moving boxes. Looking for 20 hours of
                                    help over the next two weeks."
                                </div>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-marker">2</div>
                            <div className="timeline-content">
                                <h3>👥 Invite Your Inner Circle</h3>
                                <p>
                                    Choose exactly who you want to invite. This could be close
                                    friends, family members, neighbors, or community members you
                                    trust. <strong>Your careraiser is private</strong>, only
                                    people you invite can see it and participate.
                                </p>
                                <ul className="benefit-list">
                                    <li>✓ No strangers or public exposure</li>
                                    <li>✓ You control who has access</li>
                                    <li>✓ Keep it small or build it bigger</li>
                                    <li>✓ Invite people when you're ready</li>
                                </ul>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-marker">3</div>
                            <div className="timeline-content">
                                <h3>🤝 Receive Pledges of Support</h3>
                                <p>
                                    Your invited community members can offer two types of support:
                                </p>
                                <div className="pledge-types">
                                    <div className="pledge-type-card">
                                        <div className="pledge-icon">⏰</div>
                                        <h4>Time Pledges</h4>
                                        <p>
                                            Hours of direct help, whether it's physical assistance,
                                            companionship, or time spent on tasks.
                                        </p>
                                    </div>
                                    <div className="pledge-type-card">
                                        <div className="pledge-icon">💬</div>
                                        <h4>Word Pledges</h4>
                                        <p>
                                            Specific actions, skills, or commitments, like "I'll cook
                                            you dinner while you rest" or "I'll help set up that new TV."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-marker">4</div>
                            <div className="timeline-content">
                                <h3>🌟 Watch Your Community Grow</h3>
                                <p>
                                    As people pledge their support, you'll see your progress grow
                                    and collect characters that represent your growing community.
                                    Each pledge shows that someone cares and that you're not
                                    alone.
                                </p>
                                <div className="character-showcase">
                                    <div className="character-preview">
                                        <div className="character-item">👨‍👩‍👧‍👦</div>
                                        <p className="text-sm">Build your community</p>
                                    </div>
                                    <div className="character-preview">
                                        <div className="character-item">🏆</div>
                                        <p className="text-sm">Celebrate support</p>
                                    </div>
                                    <div className="character-preview">
                                        <div className="character-item">💚</div>
                                        <p className="text-sm">Feel connected</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="why-twogether">
                <div className="container">
                    <h2 className="title-xl text-center mb-8">Why Twogther is Different</h2>
            
                    <div className="differences-grid">
                        <div className="difference-card">
                            <div className="diff-icon">🔒</div>
                            <h3>Private & Safe</h3>
                            <p>
                                Unlike public crowdfunding platforms, Twogther is for your
                                inner circle only. No strangers, no spam, just the people you
                                know and trust.
                            </p>
                        </div>

                    <div className="difference-card">
                        <div className="diff-icon">💚</div>
                            <h3>Actions, Not Money</h3>
                            <p>
                                We don't deal with money at all. This is about time, skills,
                                and meaningful actions that build real connections.
                            </p>
                    </div>

                    <div className="difference-card">
                        <div className="diff-icon">🎯</div>
                            <h3>You're In Control</h3>
                            <p>
                                You choose who to invite, what kind of support you need, and
                                when to share. Your careraiser, your rules.
                            </p>
                    </div>

                    <div className="difference-card">
                        <div className="diff-icon">👀</div>
                            <h3>Make Care Visible</h3>
                            <p>
                                Small actions often go unnoticed. Twogther highlights every
                                pledge, every offer of help, making care and community visible.
                            </p>
                    </div>

                    <div className="difference-card">
                        <div className="diff-icon">🎮</div>
                            <h3>Fun & Engaging</h3>
                            <p>
                                Collect characters as your community grows. See your support
                                network come to life in a playful, meaningful way. <strong>(coming soon!)</strong>
                            </p>
                    </div>

                    <div className="difference-card">
                        <div className="diff-icon">💯</div>
                            <h3>Try It Free</h3>
                            <p>
                                We are testing and iterating, so you can create your careraiser for free. No fees, no catch.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-cta">
                <div className="container container--narrow">
                    <div className="cta-box">
                        <h2 className="title-lg">Ready to Build Your Community?, register now</h2>
                        <p className="text-lg">
                            Start your careraiser today and discover the support that's
                            already around you.
                        </p>
                        <div className="cta-actions">
                            <Link to="/register" className="btn">
                                🌱 Start your Careraiser, but first register
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AboutPage;
