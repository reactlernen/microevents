import React, { Fragment, useEffect, useState } from 'react';
import { MicroEvent } from "../../../domain/MicroEvent/MicroEvent";
import { Api } from "../../../api/Api";
import { MicroEventService } from "../../../domain/MicroEvent/MicroEventService";

export const Events: React.FC = () => {

    const [ microEvents, setMicroEvents] = useState([] as MicroEvent[]);

    useEffect(() => {
        const microEventsService = new MicroEventService(new Api());
        microEventsService.findAll().then(receivedMicroEvents => setMicroEvents(receivedMicroEvents));
    }, []);

    return (
        <Fragment>
            <h1>Events</h1>
            {
                microEvents.map((me => (
                    <div key={me.id}>{me.title}</div>
                )))
            }
        </Fragment>
    );
};
