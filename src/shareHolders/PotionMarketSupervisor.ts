import { MarketSupervisor } from './MarketSupervisor';
import { IOffer } from './index';
import { EPotionIds } from '../data/itemIds';
import { action, computed, observable } from 'mobx';

export class PotionMarketSupervisor extends MarketSupervisor {
    constructor() {
        super();
    }

    public readonly suspend: Map<EPotionIds, boolean> = observable.map(new Map<EPotionIds, boolean>());

    @action
    public toggleChecked(id: EPotionIds) {
        this.suspend.set(id, !this.suspend.get(id));
    }

    @computed
    public get offers(): IOffer[] {

        const offer: IOffer[] = [];

        // convert to glife
        this.stocks.forEach((v, k) => {
            if (this.suspend.get(k)) {
                return;
            }

            const ratio = ((k: number) => {
                switch (k) {
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
            })(k);
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

