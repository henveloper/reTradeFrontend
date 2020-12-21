// generator of spd/dex, ...
import { EPotionIds } from '../data/itemIds';

export class PotionGenerator {
    static randomPot(tier: 1 | 2 | 3) {
        switch (tier) {
            case 1:
                // return Math.random() < 0.5 ? EPotionIds.vit : EPotionIds.def;
                return Math.random() < 3 ? EPotionIds.vit : EPotionIds.def;
            case 2:
                return Math.random() < 0.5 ? EPotionIds.wis : EPotionIds.atk;
            default:
                return Math.random() < 0.5 ? EPotionIds.dex : EPotionIds.spd;
        }
    }

    static getBuyingOffer(equivalence: 'def'): { buyingItems: number[], buyingQuantities: number[] } {
        const r = Math.random();
        const { randomPot } = PotionGenerator;
        if (r < 1 / 3) {
            return {
                buyingItems: [ randomPot(1) ],
                buyingQuantities: [ 1 ]
            };
        }
        if (r < 2 / 3) {
            return {
                buyingItems: [ randomPot(2) ],
                buyingQuantities: [ 2 ]
            };
        }
        return {
            buyingItems: [ randomPot(3) ],
            buyingQuantities: [ 3 ]
        };
    }
}
