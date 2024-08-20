export class Item {
    constructor(name, date, time, desc, done, fav) {
        this._name = name;
        this._date = date;
        this._time = time;
        this._desc = desc;
        this._done = done;
        this._fav = fav;
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

export function createItem(name, date, time, desc, done, fav) {
    return new Item(name, date, time, desc, done, fav);
}

export function toJSON(list) {
    let pList = [];
    for (let i = 0; i < list.length; i++) {
        const proj = {};
        proj.name = list[i].name;
        proj.id = list[i].id;
        proj.items = [];
        for (let j = 0; j < list[i].items.length; j++) {
            const item = {};
            item.name = list[i].items[j].name;
            item.date = list[i].items[j].date;
            item.time = list[i].items[j].time;
            item.desc = list[i].items[j].desc;
            item.done = list[i].items[j].done;
            item.fav = list[i].items[j].fav;
            proj.items.push(item);
        }
        pList.push(proj);
    }
    return JSON.stringify(pList);
}

export function parseJSON(jList) {
    let pList = [];
    for (let i = 0; i < jList.length; i++) {
        const proj = new Project(jList[i].name, jList[i].id);
        for (let j = 0; j < jList[i].items.length; j++) {
            const item = new Item(jList[i].items[j].name, jList[i].items[j].date, jList[i].items[j].time, jList[i].items[j].desc, jList[i].items[j].done, jList[i].items[j].fav);
            proj.addItems(item);
        }
        pList.push(proj);
    }
    return pList;
}
