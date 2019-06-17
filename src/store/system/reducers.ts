import { SystemAction, SystemActionType, SystemState, SystemView, ChangeViewAction } from "./types";

const initialState: SystemState = {
    view: SystemView.EVENTS
};

export function systemReducer(state = initialState, action: SystemAction): SystemState {

    switch (action.type) {
        case SystemActionType.CHANGE_VIEW:
            return {
                view: action.view
            };
        default:
            return state;
    }
}
