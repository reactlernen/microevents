import React from 'react';
import { Profile } from '../../../domain/Profile/Profile';
import './ProfilePicture.scss';

export interface OnProfilePictureClicked {
    (profile: Profile): void;
}

export interface ProfilePictureProps {
    profile: Profile;
    diameter: number;
    borderWidth: number;
    borderColor: string;
    outerBorderWidth: number;
    outerBorderColor: string;
    circle: boolean;
    profileClicked: OnProfilePictureClicked;
}

export const ProfilePicture: React.FC<ProfilePictureProps> = (props: ProfilePictureProps) => {

    const fullName = `${props.profile.firstName} ${props.profile.lastName}`;
    const borderRadius = (!props.circle) ? 0 : (props.diameter / 2);
    const innerDiameter = props.diameter - 2 * props.borderWidth;
    const innerBorderRadius = (!props.circle) ? 0 : innerDiameter / 2;

    const styleOuter: React.CSSProperties = {
        width: props.diameter,
        height: props.diameter,
        backgroundColor: props.borderColor,
        borderRadius: borderRadius,
        borderWidth: props.outerBorderWidth,
        borderColor: props.outerBorderColor
    };

    const styleInner: React.CSSProperties = {
        borderRadius: innerBorderRadius,
        width: innerDiameter,
        height: innerDiameter
    };

    const onProfilePictureClick = () => {
        props.profileClicked(props.profile);
    };

    return (
        <div style={styleOuter} onClick={onProfilePictureClick}>
            <img src={props.profile.pictureUrl}
                 alt={fullName}
                 title={fullName}
                 style={styleInner}/>
        </div>
    );

};

ProfilePicture.defaultProps = {
    diameter: 100,
    borderWidth: 4,
    borderColor: 'white',
    outerBorderWidth: 1,
    outerBorderColor: 'gray',
    circle: true,
    profileClicked: () => {
    }
};

export default ProfilePicture;
