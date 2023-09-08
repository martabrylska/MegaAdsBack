import {AdRecord} from "../records/ad.record";
import {pool} from "../utils/db";
import {AdEntity} from "../types";

afterAll(async () => {
    await pool.end();
})

test('AdRecord returns data from database for one entry.', async () => {
    const ad = await AdRecord.getOne('abc');

    expect(ad.id).toBe('abc');
    expect(ad).toBeDefined();
    expect(ad.name).toBe('testowa');

});

test('AdRecord returns null from database for unexisting entry.', async ()=>{
    const ad = await AdRecord.getOne('abcd');

    expect(ad).toBeNull();
});

test('AdRecord returns all data from database.', async ()=>{
    const ads = await AdRecord.findAll('');
    expect(ads).toBeDefined();
});

test('AdRecord returns searched data from database.', async ()=>{
    const ads = await AdRecord.findAll('test');
    expect(ads).toBeDefined();
    expect((ads[0]as AdEntity).description).toBeUndefined();
    expect((ads[0]as AdEntity).price).toBeUndefined();
    expect((ads[0]as AdEntity).lat).toBeDefined();
});

test('AdRecord.findAll returns empty array from database for not matching data.', async ()=>{
    const ads = await AdRecord.findAll('xxx');

    expect(ads).toStrictEqual([])
});

test('AdRecord.findAll returns id when adding to database.', async ()=>{
    const ad = new AdRecord({
        name: 'test',
        description: 'test',
        price: 0,
        url1: 'test.pl',
        url2: '',
        url3: '',
        lat: 3,
        lon: 4,
        views: 0,
    });

    await ad.insert();

    expect(ad.id).toBeDefined();

});
