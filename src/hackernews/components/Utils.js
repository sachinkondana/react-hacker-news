function isNull(d) {
    return d === null || d === undefined;
}

function isEmpty(d) {
    if (isNull(d)) return true;

    if (d === '') return true;

    return (
        (Array.isArray(d) || isNaN(d)) &&
        (d.length === 0 || Object.keys(d).length === 0)
    );
}

function get(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, ''); // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (typeof o === 'object' && k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

function getHostname(url) {
    return (new URL(url)).hostname;
}

export default {
    get,
    getHostname,
    isEmpty,
}