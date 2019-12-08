enum Currency {
    Rub = 'Руб',
    Euro = 'Евро',
    Dollar = '$',
    Other = '',
}

class HasTag {
    public static parse(str: string) {
        try {
            const start = str.indexOf('#');
            if (start !== -1) {
                const end = str.indexOf('</a>');
                return str.substr(start + 1, str.length - end + 1);
            }
        } catch (error) {
            console.log({ error });
        }
        return str;
    }
}

enum Employment {
    Полная = 'Полная',
    Частичная = 'Частичная',
    Проектная = 'Проектная',
    ПоЧасовая = 'По часовая',
}

export { HasTag, Employment, Currency };
