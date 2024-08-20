export class Item {
    constructor(name, date, time, desc) {
        this._name = name;
        this._date = date;
        this._time = time;
        this._desc = desc;
        this._done = false;
        this._fav = false;
    }

    get name() {
        return this._name;
    }

    set name(x) {
        this._name = x;
    }

    get date() {
        return this._date;
    }

    set date(x) {
        this._date = x;
    }

    get time() {
        return this._time;
    }

    set time(x) {
        this._time = x;
    }

    get desc() {
        return this._desc;
    }

    set desc(x) {
        this._desc = x;
    }

    get done() {
        return this._done;
    }

    set done(x) {
        this._done = x;
    }

    get fav() {
        return this._fav;
    }

    set fav(x) {
        this._fav = x;
    }
}

export class Project {
    constructor(name, id) {
        this._name = name;
        this._id = id;
        this._items = [];
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    set name(x) {
        this._name = x;
    }

    get items() {
        return this._items;
    }

    addItems(item) {
        this._items.push(item);
    }
}

export function createProj(name, id) {
    return new Project(name, id);
}

export function createItem(name, date, time, desc) {
    return new Item(name, date, time, desc);
}

