import testHtml from './test.html';
import testCss from './test.css';
import testJson from './test.json';

export function test() {
	// make sure our html file was loaded
	const node = document.createElement('div');
	node.innerHTML = testHtml;
	document.body.appendChild(node);

	// try injecting the css that we loaded into the header..
	const style = document.createElement('style');
	style.innerHTML = testCss;
	document.head.appendChild(style);

	// lets make sure our json loaded...
	const jsonNode = document.createElement('div');
	jsonNode.innerHTML = JSON.stringify(testJson);
	document.body.appendChild(jsonNode);

	// try to coerce the json into a defined schema...
	const definedJson: {foo: string, bar: any[]} = testJson;
	console.log({definedJson});
}