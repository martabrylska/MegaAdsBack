export interface SimpleAdEntity {
    id: string;
    lat: number;
    lon: number;
}

export interface AdEntity extends SimpleAdEntity {
    name: string;
    description: string;
    price: number;
    url1: string;
    url2: string;
    url3: string;
    views: number;
    accepted: boolean;
}

export interface NewAdEntity extends Omit<AdEntity, 'id'> {
    id?: string;
}