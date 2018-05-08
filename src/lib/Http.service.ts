import { Injectable, Injector } from './core';

export type HttpRequestType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

@Injectable('httpService')
export class HttpService {

	get(path: string) {
		return this.request('GET', path);
	}

	post(path: string) {
		return this.request('POST', path);
	}

	request(method: HttpRequestType, path: string) {
		console.log('request', {method, path});
		// can we delegate this to a worker?

	}
}