import React from 'react';
import { Fragment } from 'react'
import { Navbar } from "./Navbar/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Events } from "./Events/Events";
import { Profiles } from "./Profiles/Profiles";
import { Me } from "./Me/Me";


const App: React.FC = () => {
    return (
        <Router>
            <Navbar/>
            <div className="container">
                <Route path="/events" component={Events}/>
                <Route path="/profiles" component={Profiles}/>
                <Route path="/me" component={Me}/>
            </div>
        </Router>
    );
};

export default App;
