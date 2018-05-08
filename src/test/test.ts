import testHtml from './test.html';
import testCss from './test.css';
import testJson from './test.json';

import { AuthService } from '../lib/Auth.service';
import { Injector } from '../lib/core';

class Testing {
	constructor(
		private _auth = Injector.resolve<AuthService>(AuthService)
	) {
		console.log('auth->', _auth.valid);
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