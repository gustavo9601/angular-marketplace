import {Injectable} from '@angular/core';

import {config} from '../config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _path: string;

  constructor() {
    this._path = config.url;
  }

  get path() {
    return this._path;
  }

}
