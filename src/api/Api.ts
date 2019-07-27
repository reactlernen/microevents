import { EventResource } from "./event/EventResource";
import { ProfileResource } from "./profile/ProfileResource";
import { HttpClient } from "./HttpClient";
import { MeResource } from "./me/MeResource";

export class Api {

  private readonly httpClient = new HttpClient();

  readonly event: EventResource;
  readonly profile: ProfileResource;
  readonly me: MeResource;

  private static readonly BASE_URL = 'http://localhost:3000';

  constructor() {
    this.event = new EventResource(Api.BASE_URL, this.httpClient);
    this.profile = new ProfileResource(Api.BASE_URL, this.httpClient);
    this.me = new MeResource(Api.BASE_URL, this.httpClient);
  }
}
