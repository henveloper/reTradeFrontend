import { MarketSupervisor } from './MarketSupervisor';
import { IOffer } from './index';
import { EPotionIds } from '../data/itemIds';
import { computed } from 'mobx';
import { equipmentManager } from './EquipmentManager';
import { potionRates } from '../configs/potionRates';

export class PotionMarketSupervisor extends MarketSupervisor {
    constructor() {
        super();
    }

    static fpItemsInterested: [ number, string ][] = [
        // fp equipments
        ...equipmentManager.weapons.filter(e => e.tier === 11)
            .map<[ number, string ]>(e => [ e.id, e.name ]),
        ...equipmentManager.armors.filter(e => e.tier === 12)
            .map<[ number, string ]>(e => [ e.id, e.name ]),
        // realmeye fp
        [ -102, 'realmeye fp300' ],
        [ -103, 'realmeye fp400' ],
        [ -104, 'realmeye fp450' ],
    ];

    @computed
    private get fpOffers(): IOffer[] {
        const defPotCount = this.stocks.get(EPotionIds.def) ?? 0;
        if (this.stocks.get(EPotionIds.atk)) {
            return PotionMarketSupervisor.fpItemsInterested.map(([ fpId ]) => ({
                sellingItems: [ EPotionIds.atk ],
                sellingQuantities: [ 1 ],
                buyingItems: [ fpId ],
                buyingQuantities: [ 1 ],
                quantity: defPotCount,
                suspended: false,
            }));
        }
        return [];
    }

    @computed
    private get gl2potOffers(): IOffer[] {
        const { glife } = EPotionIds;
        const offers: IOffer[] = [];

        const glifeStockQuantity = this.getStockQuantity(glife);
        if (glifeStockQuantity === 0) {
            return [];
        }

        potionRates.potBuyingRates.forEach((rate, potionId) => {
            offers.push({
                sellingItems: [ glife ],
                sellingQuantities: [ 1 ],
                buyingItems: [ potionId ],
                buyingQuantities: [ rate ],
                quantity: glifeStockQuantity,
                suspended: false,
            });
        });
        return offers;
    }

    @computed
    private get pot2glOffers(): IOffer[] {
        const offers: IOffer[] = [];
        potionRates.potSellingRates.forEach((rate, potionId) => {
            const sellingQuantity = Math.floor(this.getStockQuantity(potionId) / rate);
            if (sellingQuantity === 0) {
                return;
            }

            offers.push({
                sellingItems: [ potionId ],
                sellingQuantities: [ sellingQuantity * rate ],
                buyingItems: [ EPotionIds.glife ],
                buyingQuantities: [ sellingQuantity ],
                quantity: 1,
                suspended: false,
            });
        });
        return offers;
    }


    @computed
    public get offers(): IOffer[] {
        return [
            // ...this.fpOffers,
            ...this.gl2potOffers,
            ...this.pot2glOffers,
        ];
    }
}

