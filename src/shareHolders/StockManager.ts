import Joi from 'joi';
import { appStore } from '../AppStore';
import { IStock } from './index';
import { action, computed, makeAutoObservable } from 'mobx';

export class StockManager {
    constructor() {
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
}

