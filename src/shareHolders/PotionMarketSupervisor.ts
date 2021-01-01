import { MarketSupervisor } from './MarketSupervisor';
import { IOffer } from './index';
import { EPotionIds } from '../data/itemIds';
import { computed } from 'mobx';
import { equipmentManager } from './EquipmentManager';

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
        // seasonal: 2020 oyrxmas t11 reskins
        [ 9085, 'An Icicle' ],
        [ 9610, 'Bow of Eternal Frost' ],
        [ 9086, 'Staff of Yuletide Carols' ],
        [ 9084, 'Present Dispensing Wand' ],
        [ 9612, 'Frostbite' ],
        [ 9087, 'Salju' ],
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
    public get offers(): IOffer[] {
        return [
            ...this.fpOffers,
        ];
    }
}

