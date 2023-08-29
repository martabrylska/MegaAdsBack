import {AdRecord} from "../records/ad.record";

test('AdRecord returns data from database for one entry.', async () => {
    const ad = await AdRecord.getOne('abc');

    expect(ad.id).toBe('abc');
    expect(ad).toBeDefined();
    expect(ad.name).toBe('testowa');

})

test('AdRecord returns null from database for unexisting entry.', async ()=>{
    const ad = await AdRecord.getOne('abcd');

    expect(ad).toBeNull();
})