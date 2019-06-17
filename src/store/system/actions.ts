import { SystemActionType, SystemView, ChangeViewAction } from "./types";

export function changeView(view: SystemView): ChangeViewAction {
    return {
        type: SystemActionType.CHANGE_VIEW,
        view
    }
}
