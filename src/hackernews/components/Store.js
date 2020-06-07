/**
 * This store is specific to Hacker news use case
 */

const trashName = 'HACKER_trash';

function set(value) {
    localStorage.setItem(trashName, JSON.stringify(value));
}

function get() {
    return JSON.parse(localStorage.getItem(trashName)) || [];
}

export default {
    set,
    get,
};
