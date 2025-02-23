// @ts-check

/**
 * @class
 * @param {string} jsUrl
 * @returns {Worker & {blobUrl?: string}}
 * @see {@link https://webpack.js.org/guides/web-workers/}
 * @see {@link https://github.com/webpack/webpack/discussions/14648}
 */
class CorsWorker {
    /** @param {string | URL} jsUrl */
    constructor(jsUrl) {
        var origin = location.origin;
        // jsUrl is a relative url if not in production environment.
        var absoluteUrl = new URL(jsUrl, origin);
        var runtimeScripts = ['http://localhost:3001/runtime.js'];
        var sourceCode = `
        const origin = '${origin}';
        const originalImportScripts = importScripts;
        const runtimeScripts = ${JSON.stringify(runtimeScripts)}

        self.locationOrigin = origin;
        self.locationProtocol = '${location.protocol}'
        self.importScripts = function(url) {
            originalImportScripts(new URL(url, origin));
        };

        for (let url of runtimeScripts) {
            importScripts(url);
        }
        importScripts('${absoluteUrl}'); 
    `;
        var blobUrl = URL.createObjectURL(
            new Blob([sourceCode], {
                type: 'application/javascript'
            })
        );
        /** @type {Worker & {blobUrl?: string}} */
        var worker = new Worker(blobUrl);

        worker.blobUrl = blobUrl;
        return worker;
    }
}

export default CorsWorker;
