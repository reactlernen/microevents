import { Api } from '../../api/Api';
import { Profile } from './Profile';

export class ProfileService {

    constructor(private _api: Api) {
    }

    async findAll(): Promise<Profile[]> {
        return this._api.profile.findAll();
    }

    async findById(id: number): Promise<Profile> {
        return this._api.profile.findById(id);
    }

    async findAllByName(name: string): Promise<Profile[]> {
        return Promise.all([
            this._api.profile.findAllByFirstName(name),
            this._api.profile.findAllByLastName(name),
        ]).then(([profilesByFirstName, profilesByLastName]) => [...profilesByFirstName, ...profilesByLastName]); // bug: remove duplicates
    }
}
