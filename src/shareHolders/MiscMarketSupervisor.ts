import { MarketSupervisor } from './MarketSupervisor';
import { IOffer } from './index';
import { EPotionIds } from '../data/itemIds';
import { computed } from 'mobx';
import { PotionGenerator } from './PotionGenerator';

export enum EMiscItem { paraDef = 2757, humanoidEgg = 3249, inc = 1826 }

export class MiscMarketSupervisor extends MarketSupervisor {
    constructor() {
        super();
    }

    @computed
    public get offers(): IOffer[] {
        const offer: IOffer[] = [];

        // convert to glife
        this.stocks.forEach((v, k) => {
            if ([
                EMiscItem.paraDef,
                EMiscItem.humanoidEgg,
            ].includes(k)) {
                offer.push({
                    sellingItems: [ k ],
                    sellingQuantities: [ 1 ],
                    ...PotionGenerator.getBuyingOffer('def'),
                    quantity: v,
                    suspended: false,
                });
            } else if (k === EMiscItem.inc) {
                offer.push({
                    sellingItems: [ k ],
                    sellingQuantities: [ 1 ],
                    buyingItems: [ EPotionIds.life ],
                    buyingQuantities: [ 1 ],
                    quantity: v,
                    suspended: false,
                });
            }
        });

        return offer;
    }
}

