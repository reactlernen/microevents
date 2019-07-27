import React, { Fragment } from 'react';
import { match, Route, Switch } from "react-router";
import { ProfileDetail } from "./ProfileDetail/ProfileDetail";
import { ProfileCollection } from "./ProfileCollection/ProfileCollection";


export interface ProfilesParams {
    profileId: string;
}

export interface ProfilesProps {
    match: match<ProfilesParams>;
}

export const Profiles: React.FC<ProfilesProps> = (props: ProfilesProps) => {

    return (
        <Fragment>
            <Switch>
                <Route path="/profiles/:profileId" component={ProfileDetail}/>
                <Route path="/profiles" component={ProfileCollection}/>
            </Switch>
        </Fragment>
    );
};
