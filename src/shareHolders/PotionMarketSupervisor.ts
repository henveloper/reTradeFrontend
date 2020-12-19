import { MarketSupervisor } from './MarketSupervisor';
import { IOffer } from './index';
import { EPotionIds } from '../data/itemIds';
import { action, computed, observable } from 'mobx';

export class PotionMarketSupervisor extends MarketSupervisor {
    constructor() {
        super();
    }

    public readonly checkout: Map<EPotionIds, boolean> = observable.map(new Map<EPotionIds, boolean>());

    @action
    public toggleUpgradeOnly(id: EPotionIds) {
        this.checkout.set(id, !this.checkout.get(id));
    }

    @computed
    public get offers(): IOffer[] {

        const offer: IOffer[] = [];

        this.stocks.forEach((v, k) => {
            // upgrades
            const upgradeMap: Map<EPotionIds, EPotionIds[]> = new Map()
                .set(EPotionIds.dex, [ EPotionIds.wis, EPotionIds.atk, EPotionIds.def, EPotionIds.vit ])
                .set(EPotionIds.spd, [ EPotionIds.wis, EPotionIds.atk, EPotionIds.def, EPotionIds.vit ])
                .set(EPotionIds.atk, [ EPotionIds.def, EPotionIds.vit ])
                .set(EPotionIds.wis, [ EPotionIds.def, EPotionIds.vit ]);

            if (upgradeMap.get(k)) {
                upgradeMap.get(k)!.forEach(p => {
                    offer.push({
                        sellingItems: [ k ],
                        sellingQuantities: [ v ],
                        buyingItems: [ p ],
                        buyingQuantities: [ v ],
                        quantity: 1,
                        suspended: false,
                    });
                });
            }

            if (!this.checkout.get(k)) {
                return;
            }

            // to glife
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

