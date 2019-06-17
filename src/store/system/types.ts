
export enum SystemView {
    EVENTS = 'events',
    PROFILES = 'profiles',
    ME = 'me'
}


export interface SystemState {
    view: SystemView
}

export enum SystemActionType {
    CHANGE_VIEW = 'CHANGE_VIEW'
}

interface SystemActionBase {
    type: SystemActionType
}

export interface ChangeViewAction extends SystemActionBase {
    view: SystemView;
}

export type SystemAction = ChangeViewAction;
