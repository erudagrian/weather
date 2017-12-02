export class City {
    id?: string;
    name?: string;
    woeid?: string;
    country_code?: string;
    continent?: string;

    constructor(obj?: any) {
        this.name = obj.id;
        this.woeid = obj.woeid;
        this.country_code = obj.country_code;
        this.continent = obj.continent;
    }
}
