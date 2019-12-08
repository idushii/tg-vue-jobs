enum Currency {
    Rub,
    Euro,
    Dollar,
    Other
}

class HasTag {
    static parse(str: string) {
        try {
            let start = str.indexOf('#')
            if (start != -1) {
                let end = str.indexOf('</a>')
                return str.substr(start + 1, str.length - end + 1)
            }
        } catch (error) {

        }
        return str
    }
}

enum Employment {
    Полная = "Полная",
    Частичная = "Частичная",
    Проектная = "Проектная",
    ПоЧасовая = "По часовая"
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
    text: String

    constructor(str: String) {
        let item = this.parse(str)
        this.city = item.city
        this.format = item.format
        this.employment = item.employment
        this.rating = item.rating
        this.text = str
    }

    private parse(str: String) {
        let lines = str.toLocaleLowerCase().split('<br>')
        let city = '',
            format = '',
            employment = Employment.Полная,
            rating = new Rating();

        for (let line of lines) {
            if (line.indexOf('город') != -1) {
                city = HasTag.parse(line.split(':')[1])
            }
            if (line.indexOf('формат') != -1) {
                format = HasTag.parse(line.split(':')[1])
            }
            if (line.indexOf('занятость') != -1 && line.indexOf('занятость') < 5) {
                try {
                    let _employment = line.split(':')[1].toLocaleLowerCase()
                    if (_employment.indexOf('полная') != -1) employment = Employment.Полная
                    if (_employment.indexOf('fulltime') != -1) employment = Employment.Полная
                    if (_employment.indexOf('фулл-тайм') != -1) employment = Employment.Полная

                    if (_employment.indexOf('частичная') != -1) employment = Employment.Частичная
                    if (_employment.indexOf('partime') != -1) employment = Employment.Частичная
                    if (_employment.indexOf('проект') != -1) employment = Employment.Проектная
                    if (_employment.indexOf('час') != -1) employment = Employment.ПоЧасовая
                } catch (err) {
                    console.log({ err })
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

    get City() {
        return this.city
    }

    get Format() {
        return this.format
    }

    get Employment() {
        return this.employment
    }

    get Rating() {
        return this.rating
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