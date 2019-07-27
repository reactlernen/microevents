import React from 'react';
import { Navbar } from "./Navbar/Navbar";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { MicroEvents } from "./MicroEvents/MicroEvents";
import { Profiles } from "./Profiles/Profiles";
import { ProfileDetail } from "./Profiles/ProfileDetail/ProfileDetail";
import { Me } from "./Me/Me";
import { MicroEventDetail } from "./MicroEvents/MicroEventDetail/MicroEventDetail";


const App: React.FC = () => {
    return (
        <Router>
            <Navbar/>
            <div className="container">
                <Redirect from="/" exact={true} to="/events" />
                <Switch>
                    <Route path="/events" component={MicroEvents}/>
                    <Route path="/profiles" component={Profiles}/>
                    <Route path="/me" component={Me}/>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
