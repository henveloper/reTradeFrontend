import { IOffer, IStock } from './index';
import { action, computed, makeAutoObservable } from 'mobx';
import Joi from 'joi';
import { appStore } from '../AppStore';

export abstract class RegionalMarketManager {
    protected constructor() {
        makeAutoObservable(this);
        this.stocks = [];
    }

    public stocks: IStock[];

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
    public getStockQuantity(id: number): number {
        return this.stocks.find(s => s.id === id)?.quantity ?? 0;
    }

    public abstract get offers(): IOffer[];
}
