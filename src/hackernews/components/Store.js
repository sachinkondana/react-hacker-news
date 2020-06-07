/**
 * This store is specific to Hacker news use case
 */

function set(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
}

function get(name) {
    return JSON.parse(localStorage.getItem(name));
}

export default {
    set,
    get,
};
