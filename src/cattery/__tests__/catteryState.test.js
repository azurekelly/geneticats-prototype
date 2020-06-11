import catteryReducer, {ADOPT, adoptCat, catterySelector} from '../catteryState';
import {WITHDRAW, DEPOSIT} from '../../storage/storageState';

describe('cattery actions', () => {
    it('creates action to adopt a cat', () => {
        const cat = {id: 'c1', genotype: 0};
        const expectedAction = {
            type: ADOPT,
            payload: cat
        };

        expect(adoptCat(cat)).toEqual(expectedAction);
    });
});
describe('cattery selectors', () => {
    it('selects cattery from state', () => {
        const catList = [{id: 'c1', genotype: 0}];
        const state = {cattery: catList};
        expect(catterySelector(state)).toEqual(catList);
    });
});
describe('cattery reducer', () => {
    it('has an empty cat list for initial state', () => {
        expect(catteryReducer(undefined, {})).toEqual([]);
    });
    it('adds cat to start of the cat list on ADOPT', () => {
        const cat1 = {id: 'c1', genotype: 0};
        const cat2 = {id: 'c2', genotype: 0};
        const action = {
            type: ADOPT,
            payload: cat2
        };
        expect(catteryReducer([cat1], action)).toEqual([cat2, cat1]);
    });
    it('adds cat to start of the cat list on WITHDRAW', () => {
        const cat1 = {id: 'c1', genotype: 0};
        const cat2 = {id: 'c2', genotype: 0};
        const action = {
            type: WITHDRAW,
            payload: cat2
        };
        expect(catteryReducer([cat1], action)).toEqual([cat2, cat1]);
    });
    it('removes cat from cat list on DEPOSIT', () => {
        const newCat = {id: 'c2', genotype: 0};
        const initialCats = [
            {id: 'c1', genotype: 0},
            newCat,
            {id: 'c3', genotype: 0}
        ];
        const action = {
            type: DEPOSIT,
            payload: newCat
        };
        expect(catteryReducer(initialCats, action)).toEqual([initialCats[0], initialCats[2]]);
    });
});