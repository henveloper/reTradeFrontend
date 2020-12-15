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

        // abilities
        for (const ability of abilities) {
            const value: EPotionIds = (() => {
                switch (ability.className) {
                    case 'shield':
                    case 'seal':
                    case 'spell':
                        return PotionGenerator.randomPot(1);
                    case 'cloak':
                    case 'lute':
                    case 'quiver':
                        return PotionGenerator.randomPot(2);
                    default:
                        return PotionGenerator.randomPot(3);
                }
            })();

            offers.push({
                sellingItems: [ ability.id ],
                sellingQuantities: [ 1 ],
                buyingItems: [ value ],
                buyingQuantities: [ 1 ],
                quantity: 1,
                suspended: false,
            });
        }

        // armors
        for (const armor of armors) {
            const value: EPotionIds = (() => {
                switch (armor.tier) {
                    case 11:
                        return PotionGenerator.randomPot(3);
                    case 12:
                        return PotionGenerator.randomPot(2);
                    default:
                        return EPotionIds.glife;
                }
            })();

            offers.push({
                sellingItems: [ armor.id ],
                sellingQuantities: [ 1 ],
                buyingItems: [ value ],
                buyingQuantities: [ 1 ],
                quantity: 1,
                suspended: false,
            });
        }

        return offers;
    }

}
