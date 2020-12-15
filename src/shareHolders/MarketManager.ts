import { PotionMarketManager } from './PotionMarketManager';
import { TrashGearMarketManager } from './TrashGearMarketManager';
import { action, computed, makeAutoObservable } from 'mobx';
import { appStore } from '../AppStore';
import { IStocks } from './index';
import Joi from 'joi';

export class MarketManager {

    constructor() {
        makeAutoObservable(this);
    }

    public potionBroker = new PotionMarketManager();

    public trashGearBroker = new TrashGearMarketManager();

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
        this.potionBroker.stocks = value.potionStocks;
        this.trashGearBroker.stocks = value.trashGearStocks;

        appStore.successMessage = 'Trades imported.';
    }

    @computed
    public get exportString() {
        return JSON.stringify({
            potionStocks: this.potionBroker.stocks,
            trashGearStocks: this.trashGearBroker.stocks,
        })
    }

    public get tradeString() {
        const allOffers = [
            ...this.potionBroker.offers,
            ...this.trashGearBroker.offers,
        ];
        return JSON.stringify(allOffers);
    }
}
