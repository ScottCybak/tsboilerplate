import { Observable } from 'rxjs/Observable';

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

	public post(path: string) {
		return this.request('POST', path);
	}

	public request<T>(method: HttpRequestType, path: string): Observable<T> {

		return new Observable((obs) => {
			
			const headers = HttpService.headers;
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

			req.send(); // don't forget to stringify any outgoing data.. it..

		});

	}

}