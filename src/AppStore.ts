import { createBrowserHistory, History } from 'history';
import axios from 'axios';
import { IStock, TEquipment, } from './types';
import { makeAutoObservable } from 'mobx';
import { OfferManager } from './types/OfferManager';
import { Equipment, equipments } from './data/equipments';

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

    public stocks: IStock[] = [];

    // region stock
    public addStocksQuantity(id: number) {
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

    public getStocksEquipment(type: TEquipment, tier: number): Equipment[] {
        return this.stocks
            .filter(stock => equipments.filter(e => e.type === type && e.tier === tier).find(e => e.id === stock.id))
            .map(s => equipments.find(e => e.id === s.id)!);
    }

    // endregion

    // region offers
    public computeTradesString() {

        const offerManager = new OfferManager();
        offerManager.t10Weapons = this.getStocksEquipment('weapon', 10) as any;
        offerManager.t11Weapons = this.getStocksEquipment('weapon', 11) as any;
        offerManager.t12Weapons = this.getStocksEquipment('weapon', 12) as any;
        offerManager.t5Abilities = this.getStocksEquipment('ability', 5) as any;
        offerManager.t6Abilities = this.getStocksEquipment('ability', 6) as any;
        offerManager.t11Armors = this.getStocksEquipment('armor', 11) as any;
        offerManager.t12Armors = this.getStocksEquipment('armor', 12) as any;
        offerManager.t13Armors = this.getStocksEquipment('armor', 13) as any;
        return offerManager.computeTradesString();
    }

    // endregion
}

export const appStore = new AppStore(createBrowserHistory());
