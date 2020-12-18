import { PotionMarketManager } from './PotionMarketManager';
import { TrashGearMarketManager } from './TrashGearMarketManager';
import { action, computed, makeAutoObservable } from 'mobx';
import { appStore } from '../AppStore';
import Joi from 'joi';

export class MarketManager {

    constructor() {
        makeAutoObservable(this);
    }

    public potionMarketManager = new PotionMarketManager();

    public trashGearMarketManager = new TrashGearMarketManager();

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
        const schema = Joi.object().keys({
            potionStocks: Joi.object().required(),
            trashGearStocks: Joi.object().required(),
        }).required();

        const {value, error} = schema.validate(s);
        if (error) {
            appStore.setError(error.message);
            return;
        }
        this.potionMarketManager.stocks = value.potionStocks;
        this.trashGearMarketManager.stocks = value.trashGearStocks;

        appStore.successMessage = 'Trades imported.';
    }
}
