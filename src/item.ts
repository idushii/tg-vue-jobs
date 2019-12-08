import { Currency, Employment, HasTag } from './types';
import { Rating } from './Rating';

class Item {
    public city: string;
    public format: string;
    public employment: Employment;
    public rating: Rating;
    public text: string;
    public isVakancies: boolean = false;

    constructor(str: string) {
        const item = this.parse(str);
        this.city = item.city;
        this.format = item.format;
        this.employment = item.employment;
        this.rating = item.rating;
        this.text = str;
    }

    private parse(str: string) {
        const lines = str.toLocaleLowerCase().split('<br>');
        let city = '';
        let format = '';
        let employment = Employment.Полная;
        let rating = new Rating();

        for (const line of lines) {
            if (line.indexOf('город') !== -1) {
                city = HasTag.parse(line.split(':')[1]);
            }
            if (line.indexOf('формат') !== -1) {
                format = HasTag.parse(line.split(':')[1]);
            }
            if (line.indexOf('занятость') !== -1 && line.indexOf('занятость') < 5) {
                try {
                    const localEmployment = line.split(':')[1].toLocaleLowerCase();
                    if (localEmployment.indexOf('полная') !== -1) { employment = Employment.Полная; }
                    if (localEmployment.indexOf('fulltime') !== -1) { employment = Employment.Полная; }
                    if (localEmployment.indexOf('фулл-тайм') !== -1) { employment = Employment.Полная; }

                    if (localEmployment.indexOf('частичная') !== -1) { employment = Employment.Частичная; }
                    if (localEmployment.indexOf('partime') !== -1) { employment = Employment.Частичная; }
                    if (localEmployment.indexOf('проект') !== -1) { employment = Employment.Проектная; }
                    if (localEmployment.indexOf('час') !== -1) { employment = Employment.ПоЧасовая; }
                } catch (err) {
                    console.log({ err });
                }
            }
            if (line.indexOf('вилка') !== -1) {
                rating = new Rating(line.split(':')[1]);
            }

            if (line.indexOf('#вакансия') !== -1) {
                this.isVakancies = true;
            }
        }

        return {
            city,
            format,
            employment,
            rating,
        };
    }

    get City() {
        return this.city;
    }

    get Format() {
        return this.format;
    }

    get Employment() {
        return this.employment;
    }

    get Rating() {
        return this.rating;
    }
}

export { Item };
