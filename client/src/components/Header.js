import React from 'react';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import '../styling/Header.css';

function Header (props) {
    const renderContent = () => {
        switch (props.auth) {
            case null:
                return;
            case false:
                return (
                    <li>
                        <button className="google-login-button">
                            <a href="/auth/google">Login with Google</a>
                        </button>
                    </li>
                );
            default:
                return [
                    <li key="1"><Checkout /></li>,
                    <li key="2">Credits: <span>{props.auth.credits}</span></li>,
                    <li key="3">
                        <button className="logout-button" data-tip data-for="logout">
                            <a href="/api/logout">
                                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                <ReactTooltip place="bottom" id="logout" effect="solid">Logout</ReactTooltip>
                            </a>
                        </button>
                    </li>
                ]
        }
    }

    return (
        <nav className="header-container">
            <div className="nav-wrapper">
                <Link
                    to={props.auth ? '/surveys' : '/'}
                    className="left brand-logo"
                >
                    Sorbet
                </Link>
                <ul className="right">
                    {renderContent()}
                </ul>
            </div>
        </nav>
    )
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);