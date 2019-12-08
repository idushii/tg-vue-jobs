import { Currency } from './types';

class Rating {
    public minPrice: number = 100;
    public maxPrice: number = 100;
    public currency: Currency = Currency.Rub;

    constructor(str?: string) {
        if (str) {
            const localRating = this.parse(str);
            this.currency = localRating.currency;
            this.minPrice = localRating.minPrice;
            this.maxPrice = localRating.maxPrice;
        }
    }

    public parse(str: string) {
        str = str.toLocaleLowerCase();
        let minPrice = 0; let maxPrice = 0; let currency = Currency.Rub;

        if (str.indexOf('-')! - -1) {
            const localRating = str.split('-').map((item) => item.trim());
            minPrice = Number.parseInt(localRating[0], 10);
            const index = localRating[1].indexOf(' ');
            maxPrice = Number.parseInt(localRating[1].substr(0, index), 10);
        } else if (str.indexOf(' до ') !== -1) {
            const localRating = str.split(' до ').map((item) => item.trim());
            minPrice = Number.parseInt(localRating[0], 10);
            const index = localRating[1].indexOf(' ');
            maxPrice = Number.parseInt(localRating[1].substr(0, index), 10);
        }

        if (str.indexOf('rub') !== -1) { currency = Currency.Rub; }
        if (str.indexOf('руб') !== -1) { currency = Currency.Rub; }

        if (str.indexOf('$') !== -1) { currency = Currency.Dollar; }
        if (str.indexOf('dol') !== -1) { currency = Currency.Dollar; }
        if (str.indexOf('долл') !== -1) { currency = Currency.Dollar; }

        if (str.indexOf('euro') !== -1) { currency = Currency.Euro; }
        if (str.indexOf('евро') !== -1) { currency = Currency.Euro; }
        return {
            minPrice, maxPrice, currency,
        };

    }

    public toString() {
        return `${this.minPrice} - ${this.maxPrice} ${this.currency}`;
    }
}

export { Rating };
