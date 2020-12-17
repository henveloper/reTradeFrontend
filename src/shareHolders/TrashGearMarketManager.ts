import { RegionalMarketManager } from './RegionalMarketManager';
import { EArmorSlot, EWeaponSlot, IEquipment, IOffer, IStocks } from './index';
import { Equipment, equipments } from '../data/equipments';
import { EPotionIds } from '../data/itemIds';
import { PotionGenerator } from './PotionGenerator';
import { appStore } from '../AppStore';

export class TrashGearMarketManager extends RegionalMarketManager {
    constructor() {
        super();
    }

    // todo: implement combo offer logic
    // private computeTrashWeaponArmorOffers(): IOffer[] {
    //     const offers: IOffer[] = [];
    //
    //     const inCombinations = (weapon: IEquipment, armor: IEquipment) => {
    //         const combinations: [ EWeaponSlot, EArmorSlot ][] = [
    //             [ EWeaponSlot.bow, EArmorSlot.light ],
    //             [ EWeaponSlot.bow, EArmorSlot.robe ],
    //             [ EWeaponSlot.dagger, EArmorSlot.light ],
    //             [ EWeaponSlot.katana, EArmorSlot.light ],
    //             [ EWeaponSlot.katana, EArmorSlot.heavy ],
    //             [ EWeaponSlot.staff, EArmorSlot.robe ],
    //             [ EWeaponSlot.wand, EArmorSlot.robe ],
    //             [ EWeaponSlot.sword, EArmorSlot.heavy ],
    //         ];
    //
    //         for (const c of combinations) {
    //             if (c[0] === weapon.slotType && c[1] === armor.slotType) {
    //                 return true;
    //             }
    //         }
    //         return false;
    //     };
    //
    //     const trashWeapons = [ ...this.t10Weapons, ...this.t11Weapons ];
    //     const trashArmors = [ ...this.t11Armors, ...this.t12Armors ];
    //     for (const trashWeapon of trashWeapons) {
    //         for (const trashArmor of trashArmors) {
    //             if (inCombinations(trashWeapon, trashArmor)) {
    //                 const isBetter = trashWeapon.tier === 11 && trashArmor.tier === 12;
    //                 const isSlightlyBetter = trashWeapon.tier === 11 || trashArmor.tier === 12;
    //                 offers.push({
    //                     quantity: 1,
    //                     sellingItems: [ trashWeapon.id, trashArmor.id ],
    //                     sellingQuantities: [ 1, 1 ],
    //                     buyingItems: [ isBetter ? EPotionIds.def : (isSlightlyBetter ? EPotionIds.wis : EPotionIds.spd) ],
    //                     buyingQuantities: [ 1 ],
    //                     suspended: false,
    //                 });
    //             }
    //         }
    //     }
    //
    //     return offers;
    // }

    get offers(): IOffer[] {
        const offers: IOffer[] = [];

        const weaponStocks = Object.entries(this.stocks).reduce<IStocks>((p, c) => {
            const equipment = equipments.find(e => e.id === c.id && e.type === 'weapon');
            if (equipment) {
                p[c[0]!] =
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
        for (const weapon of weaponStocks) {
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
