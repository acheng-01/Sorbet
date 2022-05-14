import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import Success from './Success';
import Cancel from './Cancel';

function App(props) {
    useEffect(() => {
        props.fetchUser();
    }, [])

    return (
        <BrowserRouter>
            <div className="container">
                <Header />
                <Routes>
                    <Route exact path="/" element={<Landing />} />
                    <Route exact path="/surveys" element={<Dashboard />} />
                    <Route path="/surveys/new" element={<SurveyNew />} />
                    <Route path="/payment/success" element={<Success />} />
                    <Route path="/payment/cancel" element={<Cancel />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default connect(null, actions)(App);