import React, { Fragment } from 'react';
import { match } from "react-router";

export interface ProfileDetailParams {
    profileId: string;
}

export interface ProfileDetailProps {
    match: match<ProfileDetailParams>;
}

export const ProfileDetail: React.FC<ProfileDetailProps> = ({ match }: ProfileDetailProps) => {
    return (
        <Fragment>
            <h1>Profile Detail ({match.params.profileId})</h1>
        </Fragment>
    );
};
