import { Link } from "react-router-dom";
import "./FundraiserCard.css";

function FundraiserCard(props) {
    const { fundraiserData } = props;
    const fundraiserLink = `fundraiser/${fundraiserData.id}`;
    return (
        <div className="fundraiser-card">
            <Link to={fundraiserLink}>
            <img src={fundraiserData.image} alt={fundraiserData.title} />
            <h3>{fundraiserData.title}</h3>
            {fundraiserData.owner_name && <p className="owner-name">By {fundraiserData.owner_name}</p>}
            </Link>
        </div>
    );
}

export default FundraiserCard;