import { MarketSupervisor } from './MarketSupervisor';
import { IOffer } from './index';
import { EPotionIds } from '../data/itemIds';
import { computed } from 'mobx';

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
                const formOffer = (id: EPotionIds, q: number): IOffer => ({
                    sellingItems: [ k ],
                    sellingQuantities: [ 1 ],
                    buyingItems: [ id ],
                    buyingQuantities: [ q ],
                    quantity: v,
                    suspended: false,
                });
                const offers: IOffer[] = [
                    ...[ EPotionIds.dex, EPotionIds.spd ].map(i => formOffer(i, 3)),
                    ...[ EPotionIds.atk, EPotionIds.wis ].map(i => formOffer(i, 2)),
                ];
                offers.forEach(o => offer.push(o));
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

