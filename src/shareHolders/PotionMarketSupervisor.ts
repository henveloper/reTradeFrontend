import { MarketSupervisor } from './MarketSupervisor';
import { IOffer } from './index';
import { EPotionIds } from '../data/itemIds';
import { action, computed, makeAutoObservable, observable } from 'mobx';
import { potionTradingRates } from '../configs/potionTradingRates';

export class PotionMarketSupervisor extends MarketSupervisor {
    constructor() {
        super();
    }

    @observable public lifeToRainbowSource: EPotionIds.glife | EPotionIds.life | null = null;
    @observable public manaToRainbowSource: EPotionIds.gmana | EPotionIds.mana | null = null;

    @action
    public changeLifeToRainbowSource(variant: number) {
        console.log(variant);
        switch (variant) {
            case 1:
                this.lifeToRainbowSource = EPotionIds.life;
                break;
            case 2:
                this.lifeToRainbowSource = EPotionIds.glife;
                break;
            default:
                this.lifeToRainbowSource = null;
        }
        console.log(this.lifeToRainbowSource)
    }

    @action
    public changeManaToRainbowSource(variant: number) {
        switch (variant) {
            case 1:
                this.manaToRainbowSource = EPotionIds.mana;
                break;
            case 2:
                this.manaToRainbowSource = EPotionIds.gmana;
                break;
            default:
                this.manaToRainbowSource = null;
        }
    }

    @computed public get lifeToRainbowSliderValue() {
        if (this.lifeToRainbowSource === null) {
            return 0;
        }
        if (this.lifeToRainbowSource === EPotionIds.life) {
            return 1;
        }
        return 2;
    }

    @computed public get manaToRainbowSliderValue() {
        if (this.manaToRainbowSource === null) {
            return 0;
        }
        if (this.manaToRainbowSource === EPotionIds.mana) {
            return 1;
        }
        return 2;
    }

    @computed
    private get lifeToRainbowOffers(): IOffer[] {
        const offers: IOffer[] = [];
        const { lifeToRainbowSource, manaToRainbowSource } = this;

        if (lifeToRainbowSource !== null) {
            potionTradingRates.rainbowToLifeRates.forEach((rate, potionId) => {
                offers.push({
                    sellingItems: [ lifeToRainbowSource ],
                    sellingQuantities: [ lifeToRainbowSource === EPotionIds.glife ? 1 : 2 ],
                    buyingItems: [ potionId ],
                    buyingQuantities: [ rate ],
                    quantity: 4,
                    suspended: false,
                });
            });
        }

        if (manaToRainbowSource !== null) {
            potionTradingRates.rainbowToLifeRates.forEach((rate, potionId) => {
                offers.push({
                    sellingItems: [ manaToRainbowSource ],
                    sellingQuantities: [ manaToRainbowSource === EPotionIds.gmana ? 1 : 2 ],
                    buyingItems: [ potionId ],
                    buyingQuantities: [ rate ],
                    quantity: 4,
                    suspended: false,
                });
            });
        }

        return offers;
    }

    @computed
    private get rainbowToLifeOffers(): IOffer[] {
        const offers: IOffer[] = [];

        potionTradingRates.rainbowToLifeRates.forEach((rate, potionId) => {
            const batchCount = this.getStockQuantity(potionId);
            if (batchCount === 0) {
                return;
            }

            offers.push({
                sellingItems: [ potionId ],
                sellingQuantities: [ 16 * batchCount ],
                buyingItems: [ EPotionIds.glife ],
                buyingQuantities: [ rate * batchCount ],
                quantity: batchCount,
                suspended: false,
            });
        });
        return offers;
    }

    @computed
    private get rainbowUpgradeOffer(): IOffer[] {
        const offers: IOffer[] = [];

        potionTradingRates.rainbowToLifeRates.forEach((rate, potionId) => {
            const batchCount = this.getStockQuantity(potionId);
            if (batchCount === 0) {
                return;
            }

            offers.push({
                sellingItems: [ potionId ],
                sellingQuantities: [ 16 * batchCount ],
                buyingItems: [ EPotionIds.glife ],
                buyingQuantities: [ rate * batchCount ],
                quantity: batchCount,
                suspended: false,
            });
        });
        return offers;
    }

    @computed
    public get offers(): IOffer[] {
        return [
            ...this.lifeToRainbowOffers,
            ...this.rainbowToLifeOffers,
        ];
    }
}

