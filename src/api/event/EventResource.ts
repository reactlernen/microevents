import { EventResponse } from './EventResponse';
import { CreateEventRequest } from './CreateEventRequest';
import { HttpClient } from "../HttpClient";


export class EventResource {

  static readonly RESOURCE_EVENTS = '/events';

  constructor(private readonly _apiBasePath: string, private _http: HttpClient) { }

  async findAll(): Promise<EventResponse[]> {
    return this._http.GET<EventResponse[]>(`${this._apiBasePath}${EventResource.RESOURCE_EVENTS}`);
  }

  async findById(id: number): Promise<EventResponse> {
    return this._http.GET<EventResponse>(`${this._apiBasePath}${EventResource.RESOURCE_EVENTS}/${id}`);
  }

  async findAllByTitle(title: string): Promise<EventResponse[]> {
    return this._http.GET<EventResponse[]>(`${this._apiBasePath}${EventResource.RESOURCE_EVENTS}?title_like=${title}`);
  }

  async createEvent(createEventRequest: CreateEventRequest, myProfileId: number): Promise<EventResponse> {
    return this._http.POST<EventResponse>(`${this._apiBasePath}${EventResource.RESOURCE_EVENTS}`, {
      ...createEventRequest,
      organizerId: myProfileId,
      participantIds: [
        myProfileId
      ]
    });
  }
}
