import { PotionMarketSupervisor } from './PotionMarketSupervisor';
import { TrashGearMarketSupervisor } from './TrashGearMarketSupervisor';
import { action, makeAutoObservable } from 'mobx';
import { appStore } from '../AppStore';
import Joi from 'joi';

export class MarketManager {

    constructor() {
        makeAutoObservable(this);
    }

    public potionMarketManager = new PotionMarketSupervisor();

    public trashGearMarketManager = new TrashGearMarketSupervisor();

    public get exportString() {
        return JSON.stringify({
            potionStocks: this.potionMarketManager.stocks,
            trashGearStocks: this.trashGearMarketManager.stocks,
        })
    }

    public get tradeString() {
        const allOffers = [
            ...this.potionMarketManager.offers,
            ...this.trashGearMarketManager.offers,
        ];
        return JSON.stringify(allOffers);
    }

    @action
    public importStocksString(s: string) {
        const obj = JSON.parse(s);
        const stockSchema = Joi.array().items(
            Joi.array().items(
                Joi.number().required()
            ).length(2)
        );
        const schema = Joi.object().keys({
            potionStocks: stockSchema,
            trashGearStocks: stockSchema,
        }).required();

        const { value, error } = schema.validate(obj);
        if (error) {
            appStore.setError(error.message);
            return;
        }
        this.potionMarketManager.import(value.potionStocks);
        this.trashGearMarketManager.import(value.trashGearStocks);

        appStore.successMessage = 'Trades imported.';
    }
}
