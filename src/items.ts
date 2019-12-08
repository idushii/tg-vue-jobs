import { Item } from './item';

class Items {
    public localItems: Item[] = [];
    public showVakancies: boolean = true;
    public showRezume: boolean = true;

    constructor(items?: Item[]) {
        if (items) {
            this.localItems = items;
        }
    }

    get value() {
        if (this.showVakancies && this.showRezume) { return this.localItems; }
        if (this.showRezume) { return this.localItems.filter((item) => !item.isVakancies); }
        if (this.showVakancies) { return this.localItems.filter((item) => item.isVakancies); }
        return [];
    }

    set value(items: Item[]) {
        this.localItems = items;
    }

    public parse(items: string[]) {
        for (const item of items) {
            this.localItems.push(new Item(item));
        }
    }
}

export { Item, Items };
