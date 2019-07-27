import { ProfileResponse } from './ProfileResponse';
import { HttpClient } from "../HttpClient";


export class ProfileResource {

  static readonly RESOURCE_PROFILES = '/profiles';

  constructor(
    private readonly _apiBasePath: string,
    private readonly _http: HttpClient) {
  }

  async findAll(): Promise<ProfileResponse[]> {
    return this._http.GET<ProfileResponse[]>(`${this._apiBasePath}${ProfileResource.RESOURCE_PROFILES}`);
  }

  async findById(id: number): Promise<ProfileResponse> {
    return this._http.GET<ProfileResponse>(`${this._apiBasePath}${ProfileResource.RESOURCE_PROFILES}/${id}`);
  }

  async findAllByFirstName(firstName: string): Promise<ProfileResponse[]> {
    return this._http.GET<ProfileResponse[]>(`${this._apiBasePath}${ProfileResource.RESOURCE_PROFILES}?firstName_like=^${firstName}`);
  }

  async findAllByLastName(lastName: string): Promise<ProfileResponse[]> {
    return this._http.GET<ProfileResponse[]>(`${this._apiBasePath}${ProfileResource.RESOURCE_PROFILES}?lastName_like=^${lastName}`);
  }
}
