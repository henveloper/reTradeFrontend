import Joi from 'joi';
import { appStore } from '../AppStore';
import { Equipment, equipments } from '../data/equipments';
import { OfferManager } from './OfferManager';
import { IStock, TEquipmentTypes } from './index';
import { action, computed, makeAutoObservable } from 'mobx';
import { EPotionId } from '../data/EPotionId';

export class StockManager {
    constructor() {
        makeAutoObservable(this);
        this.stocks = [];
    }

    private stocks: IStock[];

    @action
    public addStocksQuantity(id: number) {
        const found = this.stocks.find(t => t.id === id);
        if (found) {
            found.quantity += 1;
        } else {
            this.stocks.push({ id, quantity: 1 });
        }
    }

    @action
    public deductStocksQuantity(id: number) {
        const found = this.stocks.find(t => t.id === id);
        if (found) {
            found.quantity -= 1;
            if (found.quantity === 0) {
                this.stocks = this.stocks.filter(t => t.quantity > 0);
            }
        }
    }

    @action
    public changeStocksQuantity(id: number, quantity: string) {
        const rule = Joi.number().integer().min(0).required();
        const { error, value } = rule.validate(quantity, { convert: true });
        if (error) {
            appStore.setError(`invalid stock quantity ${ id } ${ quantity }`);
            return;
        }

        const found = this.stocks.find(t => t.id === id);
        if (found) {
            found.quantity = value;
        } else {
            this.stocks.push({ id, quantity: value });
        }
    }

    @computed
    public getStocksEquipment(type: TEquipmentTypes, tier: number): Equipment[] {
        return this.stocks
            .filter(stock => equipments.filter(e => e.type === type && e.tier === tier).find(e => e.id === stock.id))
            .map(s => equipments.find(e => e.id === s.id)!);
    }

    @computed
    public getPotionStocks(): IStock[] {
        return this.stocks.filter(stock => Object.values(EPotionId).includes(stock.id));
    }

    @computed
    public getStockQuantity(id: number): number {
        return this.stocks.find(s => s.id === id)?.quantity ?? 0;
    }

    @action
    public importTradeString(s: string) {
        if (!s) {
            appStore.errorMessage = 'I believe you did not meant to empty the trades right?';
            return;
        }

        const stocks: IStock[] = [];
        for (const trade of s.split('\n')) {
            const [ id, quantity ] = trade.split(',');
            const schema = Joi.object({
                id: Joi.number().integer().min(1).required(),
                quantity: Joi.number().integer().min(1).max(99).required(),
            });
            const validation = schema.validate({ id, quantity });
            if (validation.error) {
                appStore.errorMessage = validation.error.message;
                return;
            }
            const { value } = validation;
            stocks.push({ id: +value.id, quantity: +value.quantity });
        }
        this.stocks = stocks;
        appStore.successMessage = 'Trades imported.';
    }

    @computed
    public get exportString() {
        return this.stocks.map(s => `${ s.id },${ s.quantity }`).join('\n');
    }

    @computed
    public get tradeString() {
        const offerManager = new OfferManager();
        offerManager.t10Weapons = this.getStocksEquipment('weapon', 10) as any;
        offerManager.t11Weapons = this.getStocksEquipment('weapon', 11) as any;
        offerManager.t12Weapons = this.getStocksEquipment('weapon', 12) as any;
        offerManager.t5Abilities = this.getStocksEquipment('ability', 5) as any;
        offerManager.t6Abilities = this.getStocksEquipment('ability', 6) as any;
        offerManager.t11Armors = this.getStocksEquipment('armor', 11) as any;
        offerManager.t12Armors = this.getStocksEquipment('armor', 12) as any;
        offerManager.t13Armors = this.getStocksEquipment('armor', 13) as any;
        offerManager.potionStocks = this.getPotionStocks();
        return offerManager.computeTradesString();
    }
}

