import { PotionMarketSupervisor } from './PotionMarketSupervisor';
import { action, makeAutoObservable } from 'mobx';
import { appStore } from '../AppStore';
import Joi from 'joi';
import { MiscMarketSupervisor } from './MiscMarketSupervisor';
import { IOffer } from './index';
import { EPotionIds } from '../data/itemIds';

export class MarketManager {

    constructor() {
        makeAutoObservable(this);
    }

    public busy: boolean = false;
    @action public toggleBusy = () => {
        this.busy = !this.busy;
        return this;
    }

    public potionMarketSupervisor = new PotionMarketSupervisor();

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
            miscItemStocks: stockSchema,
        }).required();

        const { value, error } = schema.validate(obj);
        if (error) {
            appStore.setError(error.message);
            return false;
        }
        this.potionMarketSupervisor.import(value.potionStocks);
        this.miscMarketSupervisor.import(value.miscItemStocks);

        return true;
    }

    public get exportString() {
        return JSON.stringify({
            potionStocks: this.potionMarketSupervisor.stocks,
            miscItemStocks: this.miscMarketSupervisor.stocks,
        });
    }

    private static offerSignificanceFilter(offer: IOffer): boolean {
        return offer.buyingItems.length === 1
            && (offer.buyingItems[0] === EPotionIds.spd || offer.buyingItems[0] === EPotionIds.dex)
            && offer.buyingQuantities[0] === 1;
    }

    public get tradeString() {
        const allOffers = [
            ...this.potionMarketSupervisor.offers,
            ...this.miscMarketSupervisor.offers,
        ].filter(o => !this.busy || !MarketManager.offerSignificanceFilter(o));
        allOffers.reverse();
        return JSON.stringify(allOffers);

    }

    @action
    public randomize = () => {
        this.importStocksString(this.exportString);
    };
}
