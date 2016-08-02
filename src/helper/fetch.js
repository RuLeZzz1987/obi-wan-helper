export function fetch(url) {
	const xhr = new XMLHttpRequest();

	xhr.open('GET', url);
	xhr.send();

	const promise = new Promise(resolve=> {
		xhr.addEventListener('readystatechange', () => {
			if (xhr.readyState === xhr.DONE) {
				resolve(JSON.parse(xhr.responseText));
			}
		})
	});

	promise.abort = () => xhr.abort();

	return promise;
}