"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const versionCache = new Map();
async function fetchPackageVersion(pckg) {
    if (versionCache.has(pckg))
        return versionCache.get(pckg);
    const packageVersion = encodeURIComponent(pckg);
    const url = `https://registry.npmjs.org/-/package/${packageVersion}/dist-tags`;
    let response;
    // catch the errors if the version cannot be read. That helps if the PC e.g. behind the proxy, what is not supported by axios in compare to "request" module.
    try {
        response = await axios_1.default({ url, timeout: 5000 });
        if (response.status === 200) {
            const version = response.data.latest;
            versionCache.set(pckg, version);
            return version;
        }
    }
    catch (e) {
        throw new Error(`Failed to fetch the version for ${pckg} (${e})`);
    }
    throw new Error(`Failed to fetch the version for ${pckg} (${response && response.status})`);
}
exports.fetchPackageVersion = fetchPackageVersion;
