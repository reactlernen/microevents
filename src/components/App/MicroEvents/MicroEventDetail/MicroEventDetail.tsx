import React, { useEffect, useState } from 'react';
import { match } from "react-router";
import { MicroEventService } from "../../../../domain/MicroEvent/MicroEventService";
import { Api } from "../../../../api/Api";
import ProfilePicture from "../../../shared/ProfilePicture/ProfilePicture";
import { Profile } from "../../../../domain/Profile/Profile";
import { MicroEvent } from "../../../../domain/MicroEvent/MicroEvent";

export interface MicroEventDetailParams {
    eventId: string;
}

export interface MicroEventDetailProps {
    match: match<MicroEventDetailParams>;
}

const microEventsService = new MicroEventService(new Api());

function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }).format(date);
}

function formatTime(date: Date): string {
    return new Intl.DateTimeFormat('en-GB', {
        hour: 'numeric',
        minute: '2-digit',
    }).format(date);
}

export const MicroEventDetail: React.FC<MicroEventDetailProps> = ({match}: MicroEventDetailProps) => {

    const [microEvent, setMicroEvent] = useState<MicroEvent>();

    useEffect(() => {
        microEventsService.findById(parseInt(match.params.eventId)).then(setMicroEvent);
    }, [match.params.eventId]);

    const showProfileDetails = (profile: Profile) => {

    };

    return (
        <div>
            {microEvent && (<div className="card mt-4">
                <div className="card-header">
                    <small
                        className="text-muted">on {formatDate(microEvent.eventDate)} at {formatTime(microEvent.eventDate)}</small>
                </div>

                <div className="card-body">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <img className="img-fluid" src={microEvent.pictureUrl} alt="Card image cap"/>
                        </div>
                        <div className="col-12 col-lg-6">
                            <h3 className="card-title">{microEvent.title}</h3>
                            <p className="card-text">{microEvent.shortDescription}</p>
                            <div className="row">
                                <div className="d-flex flex-row flex-wrap">
                                    {microEvent.participants.map(participant => (
                                        <div key={participant.id}>

                                            <ProfilePicture profile={participant} profileClicked={showProfileDetails}
                                                            diameter={80}
                                                            borderWidth={2}
                                                            circle={true}
                                                            borderColor="white"
                                                            outerBorderWidth={1}
                                                            outerBorderColor="#239907"/>

                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    );
};
