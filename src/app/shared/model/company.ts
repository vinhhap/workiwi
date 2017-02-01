export class Company {
    constructor(
        public $key: string,
        public name: string,
        public comDes: string,
        public logoUrl: string,
        public webUrl?: string
    ) {}

    static fromJsonList(array): Company[] {
        return array.map(Company.fromJson);
    }

    static fromJson({$key, name, comDes, logoUrl, webUrl}): Company {
        return new Company(
            $key,
            name,
            comDes,
            logoUrl,
            webUrl
        )
    }
}