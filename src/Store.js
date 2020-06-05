 class Store {
    constructor(key) {
        this.key = key;
    }

    import(){

    }

    makeKey(key){
        return this.key + '_' + key
    }

    list() {
        let list = localStorage.getItem(this.makeKey('list'));
        if (!list)
            return [];
        return JSON.parse(list)
    }


    del(id) {
        localStorage.removeItem(this.makeKey(id));
        let list = this.list();
        list = list.filter(i => i.id !== id);
        localStorage.setItem(this.makeKey('list'), JSON.stringify(list));
    }

    save(d) {
        if (!d.id) {
            d.id = Math.random().toString(36).substring(2);
            let list = this.list();
            list.push({id: d.id, name: d.name});
            localStorage.setItem(this.makeKey('list'), JSON.stringify(list));
        }
        localStorage.setItem(this.makeKey(d.id), JSON.stringify(d));
    }

    clear() {
        console.log('clear')
    }
}

module.exports = Store