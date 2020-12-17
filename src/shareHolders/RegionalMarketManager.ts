import { IOffer, IStocks } from './index';
import { action, makeAutoObservable } from 'mobx';
import Joi from 'joi';
import { appStore } from '../AppStore';

export abstract class RegionalMarketManager {
    protected constructor() {
        makeAutoObservable(this);
        this.stocks = {};
    }

    public stocks: IStocks;

    public abstract get offers(): IOffer[];

    public getStockQuantity(id: number): number {
        return this.stocks[id] ?? 0;
    }

    @action
    public addStocksQuantity(id: number) {
        const found = this.stocks[id];
        if (found) {
            this.stocks[id] += 1;
        } else {
            this.stocks[id] = 1;
        }

    }

    @action
    public deductStocksQuantity(id: number) {
        const found = this.stocks[id];
        if (found) {
            this.stocks[id] -= 1;
            if (this.stocks[id] === 0) {
                delete this.stocks[id];
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

        this.stocks[id] = value;
    }
}
