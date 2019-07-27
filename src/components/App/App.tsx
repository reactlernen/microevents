import React from 'react';
import { Navbar } from "./Navbar/Navbar";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Events } from "./Events/Events";
import { Profiles } from "./Profiles/Profiles";
import { ProfileDetail } from "./Profiles/ProfileDetail/ProfileDetail";
import { Me } from "./Me/Me";
import { EventDetail } from "./Events/EventDetail/EventDetail";


const App: React.FC = () => {
    return (
        <Router>
            <Navbar/>
            <div className="container">
                <Redirect from="/" exact={true} to="/events" />
                <Switch>
                    <Route path="/events/:eventId" component={EventDetail}/>
                    <Route path="/events" component={Events}/>
                    <Route path="/profiles/:profileId" component={ProfileDetail}/>
                    <Route path="/profiles" component={Profiles}/>
                    <Route path="/me" component={Me}/>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
