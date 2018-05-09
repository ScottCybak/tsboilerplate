import { Observable } from 'rxjs/Observable';

export interface HttpPayload {
	[key: string]: string | number | boolean;
	[key: number]: string | number | boolean;
}

export type HttpRequestType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export class HttpService {

	static basePath: string = '';
	static headers: Map<string, string> = new Map();

	private static _instance: HttpService;
	static get instance() {
		return HttpService._instance || (HttpService._instance = new HttpService())
	}

	constructor() {
		
	}

	public get<T>(path: string) {
		return this.request('GET', path);
	}

	public post<T>(path: string, obj?: any) {
		return this.request('POST', path, obj);
	}

	public request<T>(method: HttpRequestType, path: string, payload?: HttpPayload | FormData): Observable<T> {

		return new Observable((obs) => {
			
			const headers = HttpService.headers;
			let form = payload && payload instanceof FormData ? payload : '';

			path = HttpService.basePath + path;
			
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
			})

			req.open(method, path, true);
			req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

			Array.from(headers.keys())
				.map(key => {
					req.setRequestHeader(key, headers.get(key))
				});

			if (payload && !form) {
				try { 
					form = JSON.stringify(payload);
				} catch (err) {
					console.warn('error\n', form);
					obs.error(`error_payload_prep`);
					return;
				}
			}

			req.send(form);

		});

	}

}