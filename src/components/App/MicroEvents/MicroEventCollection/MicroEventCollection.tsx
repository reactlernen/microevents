import React, { Fragment, useEffect, useState } from 'react';
import { match, Redirect } from "react-router";
import { MicroEvent } from "../../../../domain/MicroEvent/MicroEvent";
import { MicroEventService } from "../../../../domain/MicroEvent/MicroEventService";
import { Api } from "../../../../api/Api";
import { CollectionSearchEvent } from "../../../shared/CollectionSearch/CollectionSearchEvent";
import { CollectionSearch } from "../../../shared/CollectionSearch/CollectionSearch";
import ProfilePicture from "../../../shared/ProfilePicture/ProfilePicture";
import { Profile } from "../../../../domain/Profile/Profile";
import { Link } from "react-router-dom";
import Fab from "../../../shared/Fab/Fab";

export interface MicroEventCollectionParams {
    microEventId: string;
}

export interface MicroEventCollectionProps {
    match: match<MicroEventCollectionParams>;
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

export const MicroEventCollection: React.FC<MicroEventCollectionProps> = ({match}: MicroEventCollectionProps) => {

    const [microEvents, setMicroEvents] = useState([] as MicroEvent[]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [profileDetailsToShow, setProfileDetailsToShow] = useState<Profile>();

    useEffect(() => {
        microEventsService.findAll().then(setMicroEvents);
    }, []);

    const searchEvents = (search: CollectionSearchEvent) => {
        if (search.searchText && search.searchText.length > 0) {
            microEventsService.findAllByTitle(search.searchText).then(setMicroEvents);
        } else {
            microEventsService.findAll().then(setMicroEvents);
        }
    };

    const showProfileDetails = (profile: Profile) => {
        setProfileDetailsToShow(profile);
    };

    const showMicroEventCreateForm = () => {
        setShowCreateForm(true);
    };

    return (
        <div>
            <h1>Events</h1>
            <CollectionSearch
                collectionId="microEvents"
                labelText="Search Events by title"
                buttonLabelText="Search Events"
                onCollectionSearch={searchEvents}>
            </CollectionSearch>

            <div className="row">

                {microEvents.map(microEvent => (
                    <div className="col-12 col-md-6 col-lg-4 mb-4">


                        <div className="card">
                            <div className="card-header">
                                <small className="text-muted">on {formatDate(microEvent.eventDate)} at {formatTime(microEvent.eventDate)}</small>
                            </div>
                            <img className="card-img-top img-fluid" src={microEvent.pictureUrl} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">{microEvent.title}</h5>
                                <div className="d-flex flex-row flex-wrap">
                                    {microEvent.participants.map(participant => (
                                        <div key={participant.id}>

                                            <ProfilePicture profile={participant} profileClicked={showProfileDetails}
                                                            diameter={40}
                                                            borderWidth={2}
                                                            circle={true}
                                                            borderColor="white"
                                                            outerBorderWidth={1}
                                                            outerBorderColor="#239907"/>

                                        </div>
                                    ))}
                                </div>
                                <p className="card-text">{microEvent.shortDescription}</p>
                                <Link to={match.url + '/' + microEvent.id} className="btn btn-microevents">View
                                    Details</Link>
                            </div>
                        </div>


                    </div>

                ))}

            </div>
            <Fab tooltip="Add a new Event" onClick={showMicroEventCreateForm}></Fab>
            { showCreateForm && <Redirect to={'/events/create'} /> }
            { showProfileDetails && profileDetailsToShow && <Redirect to={`/profiles/${profileDetailsToShow.id}`} />}
        </div>
    );
};
