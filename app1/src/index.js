import {add} from 'shared';
import log from 'app2/log.js';
import {default as Worker} from './corsworker.js';

console.warn(log);
console.warn(add);

var worker = new Worker(new URL('./worker.js', import.meta.url));

worker.onmessage = function (e) {
    debugger;
};

worker.postMessage('1 + 1');
log.default(add(1, 2));
