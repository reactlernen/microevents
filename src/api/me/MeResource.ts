import { MeResponse } from './MeResponse';
import { HttpClient } from "../HttpClient";

export class MeResource {

  static readonly RESOURCE_ME = '/me';

  constructor(
    private _apiBasePath: string,
    private _http: HttpClient) {
  }

  async me(): Promise<MeResponse> {
    return this._http.GET<MeResponse>(`${this._apiBasePath}${MeResource.RESOURCE_ME}`);
  }
}
