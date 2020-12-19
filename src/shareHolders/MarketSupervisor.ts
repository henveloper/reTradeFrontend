import { IOffer, IStocks } from './index';
import { action, observable } from 'mobx';
import Joi from 'joi';
import { appStore } from '../AppStore';

export abstract class MarketSupervisor {

    public stocks: IStocks = observable.map(new Map<number, number>());


    @action
    public import(s: [number, number][]) {
        try {
            Array.from(this.stocks.keys()).forEach(k => this.stocks.delete(k));
            s.forEach(([ id, q ]) => {
                console.log(id, q);
                this.stocks.set(id, q);
            });
        } catch (err) {
            appStore.setError(`Import parse error: ${ err.message }`);
        }
    }

    public abstract get offers(): IOffer[];

    public getStockQuantity(id: number): number {
        return this.stocks.get(id) ?? 0;
    }

    @action
    public incrementStock(id: number) {
        const quantity = this.getStockQuantity(id);
        this.stocks.set(id, quantity + 1);
    }

    @action
    public deductStocksQuantity(id: number) {
        const quantity = this.getStockQuantity(id);
        if (quantity <= 1) {
            this.stocks.delete(id);
        } else {
            this.stocks.set(id, quantity - 1);
        }
    }

    @action
    public changeStocksQuantity(id: number, q: string) {
        const quantity = q || '0';
        const rule = Joi.number().integer().min(0).required();
        const { error, value } = rule.validate(quantity, { convert: true });
        if (error) {
            appStore.setError(`invalid stock quantity ${ id } ${ quantity }`);
            return;
        }

        if (value === 0) {
            this.stocks.delete(id);
        } else {
            this.stocks.set(id, value);
        }
    }
}
