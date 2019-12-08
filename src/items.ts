enum Currency {
    Rub,
    Euro,
    Dollar,
    Other
}

enum Employment {
    Полная,
    Частичная,
    Проектная,
    ПоЧасовая
}

class Rating {
    minPrice: number = 100
    maxPrice: number = 100
    currency: Currency = Currency.Rub

    constructor(str?: String) {
        if (str) {
            let _rating = this.parse(str)
            this.currency = _rating.currency
            this.minPrice = _rating.minPrice
            this.maxPrice = _rating.maxPrice
        }
    }

    parse(str: String) {
        str = str.toLocaleLowerCase()
        let minPrice = 0, maxPrice = 0, currency = Currency.Rub

        if (str.indexOf('-')! - -1) {
            let _rating = str.split('-').map(item => item.trim())
            minPrice = Number.parseInt(_rating[0])
            let index = _rating[1].indexOf(' ')
            maxPrice = Number.parseInt(_rating[1].substr(0, index))
        } else if (str.indexOf(' до ') != -1) {
            let _rating = str.split(' до ').map(item => item.trim())
            minPrice = Number.parseInt(_rating[0])
            let index = _rating[1].indexOf(' ')
            maxPrice = Number.parseInt(_rating[1].substr(0, index))
        }

        if (str.indexOf('rub') != -1) currency = Currency.Rub
        if (str.indexOf('руб') != -1) currency = Currency.Rub

        if (str.indexOf('$') != -1) currency = Currency.Dollar
        if (str.indexOf('dol') != -1) currency = Currency.Dollar
        if (str.indexOf('долл') != -1) currency = Currency.Dollar

        if (str.indexOf('euro') != -1) currency = Currency.Euro
        if (str.indexOf('евро') != -1) currency = Currency.Euro
        return {
            minPrice, maxPrice, currency
        }

    }
}

class Item {
    city: String
    format: String
    employment: Employment
    rating: Rating

    constructor(str: String) {
        let item = this.parse(str)
        this.city = item.city
        this.format = item.format
        this.employment = item.employment
        this.rating = item.rating
    }

    private parse(str: String) {
        let lines = str.toLocaleLowerCase().split('<br>')
        let city = '',
            format = '',
            employment = Employment.Полная,
            rating = new Rating();

        for (let line of lines) {
            if (line.indexOf('город') != -1) {
                city = line.split(':')[1]
            }
            if (line.indexOf('формат') != -1) {
                format = line.split(':')[1]
            }
            if (line.indexOf('занятость') != -1 && line.indexOf('занятость') < 5) {
                try {
                    let _employment = line.split(':')[1].toLocaleLowerCase()
                    if (_employment == 'полная') employment = Employment.Полная
                    if (_employment == 'fulltime') employment = Employment.Полная
                    if (_employment == 'частичная') employment = Employment.Частичная
                    if (_employment == 'partime') employment = Employment.Частичная
                    if (_employment.indexOf('проект') != -1) employment = Employment.Проектная
                    if (_employment.indexOf('час') != -1) employment = Employment.ПоЧасовая
                } catch (err) {
                    console.log({err})
                }
            }
            if (line.indexOf('вилка') != -1) {
                rating = new Rating(line.split(':')[1])
            }
        }

        return {
            city,
            format,
            employment,
            rating,
        }
    }
}

class Items {
    _items: Item[] = []

    constructor(items?: Item[]) {
        if (items)
            this._items = items
    }

    get value() {
        return this._items
    }

    set value(items: Item[]) {
        this._items = items
    }

    parse(items: String[]) {
        for (let item of items) {
            this._items.push(new Item(item));
        }
    }
}

export { Item, Items, Currency, Rating }