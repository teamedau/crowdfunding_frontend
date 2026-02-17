import { useState, useEffect } from "react";
import "./NotificationBanner.css";

function NotificationBanner({ type = "info", title, message, autoClose = true, duration = 5000 }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (autoClose) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [autoClose, duration]);

    if (!isVisible) return null;

    return (
        <div className={`notification-banner notification-banner--${type}`}>
            <div className="notification-content">
                {title && <h3 className="notification-title">{title}</h3>}
                {message && <p className="notification-message">{message}</p>}
            </div>
            <button
                className="notification-close"
                onClick={() => setIsVisible(false)}
                aria-label="Close notification"
            >
                ×
            </button>
        </div>
    );
}

export default NotificationBanner;
