import { PotionMarketSupervisor } from './PotionMarketSupervisor';
import { TrashGearMarketSupervisor } from './TrashGearMarketSupervisor';
import { action, makeAutoObservable } from 'mobx';
import { appStore } from '../AppStore';
import Joi from 'joi';
import { MiscMarketSupervisor } from './MiscMarketSupervisor';

export class MarketManager {

    constructor() {
        makeAutoObservable(this);
    }

    public potionMarketSupervisor = new PotionMarketSupervisor();

    public trashGearMarketSupervisor = new TrashGearMarketSupervisor();

    public miscMarketSupervisor = new MiscMarketSupervisor();

    @action
    public importStocksString(s: string) {
        const obj = JSON.parse(s || '{}');
        const stockSchema = Joi.array().items(
            Joi.array().items(
                Joi.number().required()
            ).length(2)
        );
        const schema = Joi.object().keys({
            potionStocks: stockSchema,
            trashGearStocks: stockSchema,
            miscItemStocks: stockSchema,
        }).required();

        const { value, error } = schema.validate(obj);
        if (error) {
            appStore.setError(error.message);
            return false;
        }
        this.potionMarketSupervisor.import(value.potionStocks);
        this.trashGearMarketSupervisor.import(value.trashGearStocks);
        this.miscMarketSupervisor.import(value.miscItemStocks);

        return true;
    }

    public get exportString() {
        return JSON.stringify({
            potionStocks: this.potionMarketSupervisor.stocks,
            trashGearStocks: this.trashGearMarketSupervisor.stocks,
            miscItemStocks: this.miscMarketSupervisor.stocks,
        });
    }

    public get tradeString() {
        const allOffers = [
            ...this.potionMarketSupervisor.offers,
            ...this.trashGearMarketSupervisor.offers,
            ...this.miscMarketSupervisor.offers,
        ];
        return JSON.stringify(allOffers);
    }

    @action
    public randomize = () => {
        this.importStocksString(this.exportString);
    };
}
