// generator of spd/dex, ...
import { EPotionIds } from '../data/itemIds';

export class PotionGenerator {
    static randomPot(tier: 1 | 2 | 3) {
        switch (tier) {
            case 1:
                return Math.random() < 0.5 ? EPotionIds.vit : EPotionIds.def;
            case 2:
                return Math.random() < 0.5 ? EPotionIds.wis : EPotionIds.atk;
            case 3:
                return Math.random() < 0.5 ? EPotionIds.vit : EPotionIds.def;
            default:
                throw new Error('Potion generator random pot tier error.');
        }
    }
}
