import { Observable, Subscriber } from 'rxjs';

export interface HttpPayload {
	[key: string]: string | number | boolean;
	[key: number]: string | number | boolean;
}
export interface HttpUrlQuery extends HttpPayload {};

export type HttpRequestType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export class HttpService {

	static basePath: string = '';
	static headers: Map<string, string> = new Map();

	private static _instance: HttpService;
	static get instance() {
		return HttpService._instance || (HttpService._instance = new HttpService())
	}

	constructor() { }

	public delete<T>(path: string, query?: HttpUrlQuery | string) {
		return this.request<T>('DELETE', path, query);
	}

	public get<T>(path: string, query?: HttpUrlQuery | string) {
		return this.request<T>('GET', path, query);
	}

	public patch<T>(path: string, query?: HttpUrlQuery | string, obj?: HttpPayload) {
		return this.request<T>('PATCH', path, query, obj);
	}

	public post<T>(path: string, query?: HttpUrlQuery | string, obj?: HttpPayload) {
		return this.request<T>('POST', path, query, obj);
	}

	public put<T>(path: string, query?: HttpUrlQuery | string, obj?: HttpPayload) {
		return this.request<T>('PUT', path, query, obj);
	}

	
	public request<T>(method: HttpRequestType, path: string, query: HttpUrlQuery | string = {}, payload: HttpPayload = {}): Observable<T> {

		return new Observable((obs) => {
			
			const headers = HttpService.headers,
				queryString = typeof query === 'string' ? query : this.convertQuery(query, obs),
				convertedPayload = this.convertPayload(payload, obs);

			path = HttpService.basePath + path + (queryString ? `?${queryString}` : '');
			
			const req = new XMLHttpRequest();

			req.addEventListener('load', (resp: ProgressEvent) => {
				const status = req.status;
				let parsed;
				try {
					parsed = JSON.parse(req.responseText);
				} catch (err) { }
				if (status === 200 && parsed) {
					return obs.next(parsed);
				}
				console.warn('error\n', {status, resp});
				return obs.error(`error_${status}`);
			});

			req.open(method, path, true);
			req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

			Array.from(headers.keys())
				.map(key => {
					req.setRequestHeader(key, headers.get(key))
				});

			if (convertedPayload) {
				req.send(convertedPayload);
			} else {
				req.send();
			}

		});

	}

	public convertPayload<T>(payload: HttpPayload = {}, obs?: Subscriber<T>): string {
		let converted: string = '';
		if (payload && Object.keys(payload).length) {
			try {
				converted = JSON.stringify(payload);
			} catch (err) {
				console.warn('error; unable to convert object to json\n', {err, payload});
				obs.error(`error_payload_prep`);
			}
		}
		return converted;
	}

	public convertQuery<T>(payload: HttpPayload = {}, obs?: Subscriber<T>): string {
		if (!payload || typeof payload !== 'object') return '';
		return [].concat(Object.keys(payload).map(key => [encodeURIComponent(key), encodeURIComponent(''+payload[key])].join('='))).join('&');
	}

}