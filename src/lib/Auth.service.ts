import { Injectable, Injector } from './core';
import { HttpService } from './Http.service';
import { Observable } from 'rxjs/Observable';

@Injectable('authService')
export class AuthService {

	constructor(
		private _http = Injector.resolve<HttpService>(HttpService),
	) {
		console.log('auth is using _http', _http);
	}

	
	get valid() {
		return this._http.get('/auth/validate');
	}
}