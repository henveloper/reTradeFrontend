import { Broker } from './Broker';
import { IOffer, IStock } from './index';
import { Equipment, equipments } from '../data/equipments';
import { EPotionIds } from '../data/itemIds';
import { PotionGenerator } from './PotionGenerator';

export class TrashGearBroker extends Broker {
    constructor() {
        super();
    }

    stocks: IStock<number>[] = [];

    get offers(): IOffer[] {
        const offers: IOffer[] = [];

        const weapons = this.stocks.reduce<Equipment[]>((p, c) => {
            const equipment = equipments.find(e => e.id === c.id && e.type === 'weapon');
            if (equipment) {
                p.push(equipment);
            }
            return p;
        }, []);

        const abilities = this.stocks.reduce<Equipment[]>((p, c) => {
            const equipment = equipments.find(e => e.id === c.id && e.type === 'ability');
            if (equipment) {
                p.push(equipment);
            }
            return p;
        }, []);

        const armors = this.stocks.reduce<Equipment[]>((p, c) => {
            const equipment = equipments.find(e => e.id === c.id && e.type === 'armor');
            if (equipment) {
                p.push(equipment);
            }
            return p;
        }, []);

        // weapons
        for (const weapon of weapons) {
            const value: EPotionIds = (() => {
                if (weapon.tier === 10) {
                    return PotionGenerator.randomPot(3);
                }
                switch (weapon.className) {
                    case 'sword':
                    case 'dagger':
                    case 'staff':
                        return PotionGenerator.randomPot(1);
                    case 'katana':
                    case 'bow':
                        return PotionGenerator.randomPot(2);
                    case 'wand':
                        return PotionGenerator.randomPot(3);
                    default:
                        return EPotionIds.glife;
                }
            })();

            offers.push({
                sellingItems: [ weapon.id ],
                sellingQuantities: [ 1 ],
                buyingItems: [ value ],
                buyingQuantities: [ 1 ],
                quantity: 1,
                suspended: false,
            });
        }

        // equipments
        

        // armors

        return [];
    }

}
