import { Broker } from './Broker';
import { IOffer, IStock } from './index';
import { EPotionId } from '../data/EPotionId';

export class PotionBroker extends Broker {
    constructor() {
        super();
    }

    public stocks: IStock<EPotionId>[] = [];

    public get offers(): IOffer[] {
        const offer: IOffer[] = [];

        // convert to glife
        for (const stock of this.stocks) {
            const ratio = (() => {
                switch (stock.id) {
                    case EPotionId.dex:
                    case EPotionId.spd:
                        return 8;
                    case EPotionId.wis:
                    case EPotionId.atk:
                        return 6;
                    case EPotionId.def:
                    case EPotionId.vit:
                        return 4;
                    default:
                        return Number.MAX_SAFE_INTEGER;
                }
            })();
            const batchCount = Math.floor(stock.quantity / ratio);
            if (batchCount === 0) {
                continue;
            }
            offer.push({
                sellingItems: [stock.id],
                sellingQuantities: [batchCount * ratio],
                buyingItems: [EPotionId.glife],
                buyingQuantities: [batchCount],
                quantity: 1,
                suspended: false,
            });
        }

        return offer;
    }
}

