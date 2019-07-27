import React, { Fragment, useEffect, useState } from 'react';
import { match, Route, Switch } from "react-router";
import { MicroEventDetail } from "./MicroEventDetail/MicroEventDetail";
import { MicroEventCollection } from "./MicroEventCollection/MicroEventCollection";
import MicroEventCreate from "./MicroEventCreate/MicroEventCreate";

export interface MicroEventParams {
    eventId: string;
}

export interface MicroEventProps {
    match: match<MicroEventParams>;
}

export const MicroEvents: React.FC<MicroEventProps> = (props: MicroEventProps) => {

    return (
        <Fragment>
                <Switch>
                    <Route path="/events/create" component={MicroEventCreate}/>
                    <Route path="/events/:eventId" component={MicroEventDetail}/>
                    <Route path="/events" component={MicroEventCollection}/>
                </Switch>
        </Fragment>
    );
};
