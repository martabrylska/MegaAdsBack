import {AdEntity, NewAdEntity, SimpleAdEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';

type AdRecordResults = [AdEntity[], FieldPacket[]];

export class AdRecord implements AdEntity {
    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public url1: string;
    public url2: string;
    public url3: string;
    public lat: number;
    public lon: number;

    constructor(obj: NewAdEntity) {
        if (!obj.name || obj.name.length > 100 ) {
            throw new ValidationError('Nazwa ogłoszenie nie może być pusta ani przekraczać 100 znaków')
        }

        if (obj.description.length > 1000 ) {
            throw new ValidationError('Treść ogłoszenia nie może przekraczać 1000 znaków')
        }

        if (obj.price < 0 || obj.price > 9999999 ) {
            throw new ValidationError('Cena nie może być mniejsza od 0 ani większa niż 9 999 999zl')
        }

        [obj.url2, obj.url3].map(url => {
            if (url) {
                if (url.length > 100 ) {
                    throw new ValidationError('Link do ogłoszenia nie może przekraczać 100 znaków')
                }
            }
        })

        if (!obj.url1 || obj.url1.length > 100) {
            throw new ValidationError('Link do ogłoszenia nie może być pusty ani przekraczać 100 znaków')
        }

        if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
            throw new ValidationError('Nie można zlokalizować ogłoszenia')
        }

        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url1 = obj.url1;
        this.url2 = obj.url2;
        this.url3 = obj.url3;
        this.lat = obj.lat;
        this.lon = obj.lon;

    }

    static async getOne(id: string): Promise<AdRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE `id` = :id", {
            id,
        }) as AdRecordResults;

        return results.length === 0 ? null : new AdRecord(results[0]);
    }

    static async findAll(name: string): Promise<SimpleAdEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE `name` LIKE :search", {
            search: `%${name}%`,
        }) as AdRecordResults;

        return results.map(result => {
            const {id, lat, lon} = result;
            return {id, lat, lon};
        });
    }

    async insert(): Promise<string>{
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `ads`(`id`, `name`, `description`, `price`, `url1`, `url2`, `url3`, `lat`, `lon`) VALUES(:id, :name, :description, :price, :url1, :url2, :url3, :lat, :lon)", {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            url1: this.url1,
            url2: this.url2,
            url3: this.url3,
            lat: this.lat,
            lon: this.lon,
        });

        return this.id;
    }
}