enum Currency {
    Rub,
    Euro,
    Dollar,
    Other
}

class Rating {
    minPrice: number
    maxPrice: number
    currency: Currency

    constructor(str:String) {
        this.currency = Currency.Rub
        this.minPrice = 100
        this.maxPrice = 100
    }
}

class Item {
    City: String
    Format: String
    Employment: String 
    Rating: Rating

    constructor(str:String) {
        this.City = ''
        this.Format = ''
        this.Employment = ''
        this.Rating = new Rating(str)
    }

    private parse(str: String) {
        return new Item(str)
    }
}

class Items {
    _items: Item[] = []

    constructor(items:Item[]) {
        this._items = items
    }

    get value() {
        return this._items
    }

    set value(items: Item[]) {
        this._items = items
    }
}