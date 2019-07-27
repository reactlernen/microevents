import React, { Fragment } from 'react';
import { match } from "react-router";

export interface EventDetailParams {
    eventId: string;
}

export interface EventDetailProps {
    match: match<EventDetailParams>;
}

export const EventDetail: React.FC<EventDetailProps> = ({ match }: EventDetailProps) => {
    return (
        <Fragment>
            <h1>Event Detail ({match.params.eventId})</h1>
        </Fragment>
    );
};
