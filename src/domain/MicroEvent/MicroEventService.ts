import { Api } from '../../api/Api';
import { EventResponse } from '../../api/event/EventResponse';
import { CreateEventRequest } from '../../api/event/CreateEventRequest';
import { MeResponse } from '../../api/me/MeResponse';
import { Profile } from '../Profile/Profile';
import { MicroEvent } from './MicroEvent';


export class MicroEventService {

    constructor(private _api: Api) {
    }

    private static parseIsoDatetime(dtstr: string): Date {
        const dt = dtstr.split(/[: T-]/).map(parseFloat);
        return new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0, 0);
    }

    async findAll(): Promise<MicroEvent[]> {
        return this._api.event.findAll().then((eventResponses: EventResponse[]) => {
            return Promise.all(eventResponses.map(this._toMicroEvent));
        });
    }

    async findById(id: number): Promise<MicroEvent> {
        return this._api.event.findById(id).then(this._toMicroEvent);
    }

    async findAllByTitle(title: string): Promise<MicroEvent[]> {

        return this._api.event.findAllByTitle(title).then((eventResponses: EventResponse[]) => {
            return Promise.all(eventResponses.map(this._toMicroEvent));
        });
    }

    async createEvent(createEventRequest: CreateEventRequest): Promise<MicroEvent> {
        return this._api.me.me().then((me: MeResponse) =>
            this._api.event.createEvent(createEventRequest, me.id).then(this._toMicroEvent)
        );
    }

    private _toMicroEvent(eventResponse: EventResponse): Promise<MicroEvent> {
        const participantPromises = eventResponse.participantIds.map(participantId => this._api.profile.findById(participantId));
        return Promise.all(participantPromises).then((participants: Profile[]) => {
            return {
                ...eventResponse,
                participants,
                eventDate: MicroEventService.parseIsoDatetime(eventResponse.eventDate)
            } as MicroEvent;
        });
    }
}
