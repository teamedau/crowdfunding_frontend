import useFundraisers from "../hooks/use-fundraisers";
import communityImg from "../assets/community-1.png";
import kidsImg from "../assets/kids.png";
import "./HomePage.css";


function HomePage() {
    const { fundraisers } = useFundraisers();

    return (
        <main>

            
            <section className="hero">
                <div className="hero-content">
                    <h1>Tired of feeling disconnected?</h1>
                    <p>
                        Bring friends and family together to support each other through meaningful actions, and discover the community you have around.
                    </p>

                    <div className="hero-actions">
                        <button onClick={() => window.location.href = '/register'}>Create your account now</button>
                    </div>
                </div>

                <div className="hero-image">
                    <img
                        src={communityImg}
                        alt="communities growing together"
                    />
                </div>
            </section>


            <section className="about" id="about">
                <h2>What is this fundraiser about?</h2>

                <div className="about-image">
                    <img
                        src={kidsImg}
                        alt="we are in this together"
                    />
                </div>
                <p>
                    Twogther is a community-driven platform for inner circles: friends, family, and close communities, to support each other through actions instead of money. In a hyper-connected world where loneliness is rising, Twogther makes care visible, showing how our closest people show up, help, and grow together. Now there are no excuses to not support each other, and no more barriers to receiving support when you need it most.
                </p>
            </section>


            <section className="cta">
                <h2>Ready to get started?</h2>
                <p>
                    Whether you're raising funds for yourself, a loved one,
                    or a community project, getting started takes less than 5 minutes.
                </p>

                <button onClick={() => window.location.href = '/register'}>Bring your community together</button>
            </section>


            <section className="testimonials">
                <h2>Stories from our community</h2>

                <div className="testimonials-grid">
                    <article className="testimonial">
                        <p>
                            “I never thought it would be this easy to get support.
                            The community showed up in ways I couldn't imagine.”
                        </p>
                        <span>— Ana, community organiser</span>
                    </article>

                    <article className="testimonial">
                        <p>
                            “Setting up my fundraiser took seconds.
                            Sharing it made all the difference.”
                        </p>
                        <span>— James, grandpa of 1 little princes</span>
                    </article>

                    <article className="testimonial">
                        <p>
                            “Transparent, human, and simple.
                            Exactly what fundraising should feel like.”
                        </p>
                        <span>— Maria, mum of 3 boys</span>
                    </article>
                </div>
            </section>


            <footer className="footer">
                <div className="footer-content">
                    <p>© 2026 Twogether. All rights reserved.</p>

                    <nav className="footer-nav">
                        <a href="/about">About</a>
                    </nav>
                </div>
            </footer>

        </main>
    );
}

export default HomePage;
