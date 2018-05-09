import testHtml from './test.html';
import testCss from './test.css';
import testJson from './test.json';

import { CookieService } from '../lib/Cookie.service';
import { HttpService } from '../lib/Http.service';


// gibberish.. 
HttpService.basePath = 'https://httpbin.org/';
HttpService.headers.set('foo', 'bar'); // gibberish to illustrate

// test some cookie junk

class Testing {
	constructor(
		private _http = HttpService.instance,
		private _cookie = CookieService.instance
	) {

		// test out our cookie service.. 
		let count = +(_cookie.get('load-count') || 0);
		console.log(`this has been loaded ${count} times`);
		_cookie.set('load-count', '' + (++count))

		_http.get('get').subscribe(
			resp => console.log('get::good', resp),
			err => console.warn('get::bad', err)
		);

		_http.post('post', {foo: 'bar', test: new Date()}).subscribe(
			resp => console.log('post::good', resp),
			err => console.warn('post::bad', err)
		);
	}
}


// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export function test() {

	const t = new Testing();


	// make sure our html file was loaded
	// const node = document.createElement('div');
	// node.innerHTML = testHtml;
	// document.body.appendChild(node);

	// // try injecting the css that we loaded into the header..
	// const style = document.createElement('style');
	// style.innerHTML = testCss;
	// document.head.appendChild(style);

	// // lets make sure our json loaded...
	// const jsonNode = document.createElement('div');
	// jsonNode.innerHTML = JSON.stringify(testJson);
	// document.body.appendChild(jsonNode);

	// // try to coerce the json into a defined schema...
	// const definedJson: {foo: string, bar: any[]} = testJson;
	// console.log({definedJson});

	// // lets test our observable stuffs
	// const delay = 100,
	// 	subject = new BehaviorSubject<boolean>(false),
	// 	subscriber = subject.subscribe(
	// 		(status) => {
	// 			console.log('status change', status);
	// 		},
	// 		(err) => {
	// 			console.log('error', err);
	// 		},
	// 		() => {
	// 			console.log('complete!'); // cant seem to reach this..
	// 		}
	// 	);

	// setTimeout(() => subject.next(true), delay * 1);
	// setTimeout(() => subject.error('intentional error'), delay * 2);
	// // setTimeout(() => subject.complete(), 1000);
	// setTimeout(() => subscriber.unsubscribe(), delay * 3);
	// setTimeout(() => {
	// 	if (subject.observers.length) {
	// 		console.warn('Subject wasn\'t unsubscribed property...');
	// 	} else {
	// 		console.log('Unsubscribe was successful!');
	// 	}
	// }, delay * 4)

}