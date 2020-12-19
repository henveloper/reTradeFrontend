import { MarketSupervisor } from './MarketSupervisor';
import { IOffer } from './index';
import { EPotionIds } from '../data/itemIds';
import { computed } from 'mobx';

export class PotionMarketSupervisor extends MarketSupervisor {
    constructor() {
        super();
    }

    @computed
    public get offers(): IOffer[] {
        const potionIds = Object.values(EPotionIds);

        const offer: IOffer[] = [];

        // convert to glife
        this.stocks.forEach((v, k) => {
            const ratio = (() => {
                switch (+potionIds) {
                    case EPotionIds.dex:
                    case EPotionIds.spd:
                        return 8;
                    case EPotionIds.wis:
                    case EPotionIds.atk:
                        return 6;
                    case EPotionIds.def:
                    case EPotionIds.vit:
                        return 4;
                    default:
                        return Number.MAX_SAFE_INTEGER;
                }
            })();
            const batchCount = Math.floor(v / ratio);
            if (batchCount === 0) {
                return;
            }
            offer.push({
                sellingItems: [ k ],
                sellingQuantities: [ batchCount * ratio ],
                buyingItems: [ EPotionIds.glife ],
                buyingQuantities: [ batchCount ],
                quantity: 1,
                suspended: false,
            });
        });

        return offer;
    }
}

