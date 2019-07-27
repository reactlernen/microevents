import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ChangeViewAction, SystemView } from "../../../store/system/types";
import { AppState } from "../../../store";
import { Dispatch } from "redux";
import { changeView } from "../../../store/system/actions";
import { NavLink } from "react-router-dom";

//const styleForActiveView = (activeView: SystemView) => (requestedView: SystemView) => 'nav-link ' + (activeView === requestedView ? 'active' : '');

export interface NavbarItem {
    targetView: SystemView;
    targetViewLabel: string;
    pathTo: string;
}

const defaultNavbarItems: NavbarItem[] = [
    {
        targetView: SystemView.EVENTS,
        targetViewLabel: 'Micro Events',
        pathTo: '/events'
    },
    {
        targetView: SystemView.PROFILES,
        targetViewLabel: 'Profiles',
        pathTo: '/profiles'
    },
    {
        targetView: SystemView.ME,
        targetViewLabel: 'Me',
        pathTo: '/me'
    }
];

export interface NavbarProps {
    items?: NavbarItem[]
}


export const Navbar: React.FunctionComponent<NavbarProps> = ({ items = defaultNavbarItems }) => {

    const currentView: SystemView = useSelector((state: AppState) => state.system.view);
    const dispatch = useDispatch<Dispatch<ChangeViewAction>>();

    return (<nav className="navbar navbar-expand-sm navbar-dark bg-microevents sticky-top">
        <a className="navbar-brand d-none d-sm-inline-block">MicroEvents</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse align-items-end" id="navbarNav">
            <ul className="navbar-nav">
                {
                    items.map((item, i) => (
                        <li className="nav-item" key={i}>
                            <NavLink className="nav-link" to={item.pathTo} activeClassName="active" onClick={() => dispatch(changeView(item.targetView))}>{item.targetViewLabel}</NavLink>
                        </li>
                    ))
                }
            </ul>
        </div>
    </nav>)
};
