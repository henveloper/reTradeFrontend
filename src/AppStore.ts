import { createBrowserHistory, History } from 'history';
import axios from 'axios';
import { IStocks } from './types';
import { makeAutoObservable } from 'mobx';
import { abilityIds, armorIds, weaponIds } from './data/objectIds';
import { TempOfferManager } from './types/TempOfferManager';

export class AppStore {
    constructor(public history: History) {
        makeAutoObservable(this);
        axios.defaults.withCredentials = true;
    }

    async asyncInits() {
        //
    }

    public errorMessage: string = '';
    public successMessage: string = '';

    public stocks: IStocks = [];

    public get stockIds() {
        return this.stocks.map(s => s.id);
    }


    // region stock
    public addStocksQuantity(id: number) {
        console.log(id);
        const found = this.stocks.find(t => t.id === id);
        if (found) {
            found.quantity += 1;
        } else {
            this.stocks.push({ id, quantity: 1 });
        }
    }

    public deductStocksQuantity(id: number) {
        const found = this.stocks.find(t => t.id === id);
        if (found) {
            found.quantity -= 1;
            if (found.quantity === 0) {
                this.stocks = this.stocks.filter(t => t.quantity > 0);
            }
        }
    }

    public get t10WeaponStockIds() {
        const relaventIds = weaponIds.reduce<number[]>((p, c) => {
            p.push(c[0]);
            return p;
        }, []);
        return this.stockIds.filter(id => relaventIds.includes(id));
    }

    public get t11WeaponStockIds() {
        const relaventIds = weaponIds.reduce<number[]>((p, c) => {
            p.push(c[1]);
            return p;
        }, []);
        return this.stockIds.filter(id => relaventIds.includes(id));
    }

    public get t12WeaponStockIds() {
        const relaventIds = weaponIds.reduce<number[]>((p, c) => {
            p.push(c[2]);
            return p;
        }, []);
        return this.stockIds.filter(id => relaventIds.includes(id));
    }

    public get t5AbilityStockIds() {
        const relaventIds = abilityIds.reduce<number[]>((p, c) => {
            p.push(c[0]);
            return p;
        }, []);
        return this.stockIds.filter(id => relaventIds.includes(id));
    }

    public get t6AbilityStockIds() {
        const relaventIds = abilityIds.reduce<number[]>((p, c) => {
            p.push(c[1]);
            return p;
        }, []);
        return this.stockIds.filter(id => relaventIds.includes(id));
    }

    public get t11ArmorStockIds() {
        const relaventIds = armorIds.reduce<number[]>((p, c) => {
            p.push(c[0]);
            return p;
        }, []);
        return this.stockIds.filter(id => relaventIds.includes(id));
    }

    public get t12ArmorStockIds() {
        const relaventIds = armorIds.reduce<number[]>((p, c) => {
            p.push(c[1]);
            return p;
        }, []);
        return this.stockIds.filter(id => relaventIds.includes(id));
    }

    public get t13ArmorStockIds() {
        const relaventIds = armorIds.reduce<number[]>((p, c) => {
            p.push(c[2]);
            return p;
        }, []);
        return this.stockIds.filter(id => relaventIds.includes(id));
    }


    // endregion

    // region offers
    public computeTradesString() {

        const offerManager = new TempOfferManager();
        offerManager.t10WeaponIds = this.t10WeaponStockIds;
        offerManager.t11WeaponIds = this.t11WeaponStockIds;
        offerManager.t12WeaponIds = this.t12WeaponStockIds;
        offerManager.t5AbilityIds = this.t5AbilityStockIds;
        offerManager.t6AbilityIds = this.t6AbilityStockIds;
        offerManager.t11ArmorIds = this.t11ArmorStockIds;
        offerManager.t12ArmorIds = this.t12ArmorStockIds;
        offerManager.t13ArmorIds = this.t13ArmorStockIds;
        return offerManager.computeTradesString();
    }

    // endregion
}

export const appStore = new AppStore(createBrowserHistory());
