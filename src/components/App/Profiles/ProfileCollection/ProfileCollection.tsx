import React, { useEffect, useState } from 'react';
import { match } from "react-router";
import { ProfileService } from "../../../../domain/Profile/ProfileService";
import { Api } from "../../../../api/Api";
import { CollectionSearchEvent } from "../../../shared/CollectionSearch/CollectionSearchEvent";
import { CollectionSearch } from "../../../shared/CollectionSearch/CollectionSearch";
import ProfilePicture from "../../../shared/ProfilePicture/ProfilePicture";
import { Profile } from "../../../../domain/Profile/Profile";
import { Link } from "react-router-dom";

export interface ProfileCollectionParams {
    profileId: string;
}

export interface ProfileCollectionProps {
    match: match<ProfileCollectionParams>;
}

const profileService = new ProfileService(new Api());

export const ProfileCollection: React.FC<ProfileCollectionProps> = ({match}: ProfileCollectionProps) => {
    const [profiles, setProfiles] = useState([] as Profile[]);

    useEffect(() => {
        profileService.findAll().then(setProfiles);
    }, []);

    const searchProfiles = (search: CollectionSearchEvent) => {
        if (search.searchText && search.searchText.length > 0) {
            profileService.findAllByName(search.searchText).then(setProfiles);
        } else {
            profileService.findAll().then(setProfiles);
        }
    };

    const showProfileDetails = (profile: Profile) => {

    };

    return (
        <div>
            <h1>Profiles</h1>
            <CollectionSearch
                collectionId="profiles"
                labelText="Search Profiles by name"
                buttonLabelText="Search Profiles"
                onCollectionSearch={searchProfiles}>
            </CollectionSearch>

            <div className="row">

                {profiles.map(profile => (
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <div className="card text-center">
                            <div className="card-body">
                                <div className="d-flex justify-content-center mb-4">
                                    <ProfilePicture profile={profile}
                                                    profileClicked={showProfileDetails}
                                                    diameter={150}
                                                    borderWidth={8}
                                                    circle={true}
                                                    borderColor="white"
                                                    outerBorderWidth={1}
                                                    outerBorderColor="#239907"/>
                                </div>
                                <h5 className="card-title">{profile.firstName} {profile.lastName}</h5>
                                <p className="card-text">{profile.description}</p>
                                <Link to={match.url + '/' + profile.id} className="btn btn-microevents">View
                                    Details</Link>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};
