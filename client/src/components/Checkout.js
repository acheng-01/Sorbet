import axios from 'axios';
import React, { useState } from 'react';
import '../styling/Checkout.css';

function Checkout() {
    const [isLoading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        const response = await axios.post('/api/stripe');
        setLoading(false);
        window.location = response.data.url;
    }

    return (
        <button className="checkout-button" onClick={handleClick} disabled={isLoading}>
            <div className="checkout-text-container">
                <p className="text">{isLoading ? "Loading..." : "Add Credits"}</p>
            </div>
        </button>
    );
}

export default Checkout;