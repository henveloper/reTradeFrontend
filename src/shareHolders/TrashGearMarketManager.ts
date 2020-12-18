import { RegionalMarketManager } from './RegionalMarketManager';
import { IOffer, IStocks } from './index';
import { EPotionIds } from '../data/itemIds';
import { PotionGenerator } from './PotionGenerator';
import { equipmentManager } from './EquipmentManager';
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

        const filterEquipmentStocks = (variant: string) => {
            return Object.entries(this.stocks).reduce<IStocks>((p, [ k, v ]) => {
                equipmentManager.getEquipmentById(k)?.type === variant && (p[k] = v);
                return p;
            }, {});
        };

        const weapons = filterEquipmentStocks('weapon');
        const abilities = filterEquipmentStocks('ability');
        const armors = filterEquipmentStocks('armor');

        // weapons
        for (const weaponId of Object.keys(weapons)) {
            const equipment = equipmentManager.getEquipmentById(+weaponId);
            if (!equipment) {
                continue;
            }

            const value: EPotionIds = (() => {
                if (equipment.tier === 10) {
                    return PotionGenerator.randomPot(3);
                }
                switch (equipment.className) {
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
                sellingItems: [ weaponId ],
                sellingQuantities: [ 1 ],
                buyingItems: [ value ],
                buyingQuantities: [ 1 ],
                quantity: 1,
                suspended: false,
            });
        }

        // abilities
        for (const id of Object.keys(abilities)) {
            const equipment = equipmentManager.getEquipmentById(id);
            if (!equipment) {
                continue;
            }

            const value: EPotionIds = (() => {
                switch (equipment.className) {
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
                sellingItems: [ id ],
                sellingQuantities: [ 1 ],
                buyingItems: [ value ],
                buyingQuantities: [ 1 ],
                quantity: 1,
                suspended: false,
            });
        }

        // armors
        for (const id of Object.keys(armors)) {
            const equipment = equipmentManager.getEquipmentById(id);
            if (!equipment) {
                continue;
            }

            const value: EPotionIds = (() => {
                switch (equipment.tier) {
                    case 11:
                        return PotionGenerator.randomPot(3);
                    case 12:
                        return PotionGenerator.randomPot(2);
                    default:
                        return EPotionIds.glife;
                }
            })();

            offers.push({
                sellingItems: [ id ],
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
