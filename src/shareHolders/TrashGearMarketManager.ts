import { RegionalMarketManager } from './RegionalMarketManager';
import { IOffer, IStocks } from './index';
import { equipmentManager } from './EquipmentManager';

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

        const filterEquipmentStocks = (variant: string, maxTier?: number) => {
            return Object.entries(this.stocks).reduce<IStocks>((p, [ k, v ]) => {
                const equipment = equipmentManager.getEquipmentById(k);
                if (equipment?.type === variant && (maxTier === undefined || equipment.tier <= maxTier)) {
                    p[k] = v;
                }
                return p;
            }, {});
        };

        const weapons = filterEquipmentStocks('weapon');
        const trashWeapons = filterEquipmentStocks('weapon', 11);
        const abilities = filterEquipmentStocks('ability');
        const trashAbilities = filterEquipmentStocks('ability', 5);
        const armors = filterEquipmentStocks('armor');
        const trashArmors = filterEquipmentStocks('armor', 12);

        function value2pot(v: number) {
            return;
        }

        // weapons
        for (const id of Object.keys(weapons)) {
            const equipment = equipmentManager.getEquipmentById(id);
            if (!equipment) {
                continue;
            }
            const setOffer = equipmentManager.generateSetOffer({ weapon: equipment });
            if (setOffer) {
                offers.push(setOffer);
            }
        }

        // abilities
        for (const id of Object.keys(abilities)) {
            const equipment = equipmentManager.getEquipmentById(id);
            if (!equipment) {
                continue;
            }
            const setOffer = equipmentManager.generateSetOffer({ ability: equipment });
            if (setOffer) {
                offers.push(setOffer);
            }
        }

        // armors
        for (const id of Object.keys(armors)) {
            const equipment = equipmentManager.getEquipmentById(id);
            if (!equipment) {
                continue;
            }
            const setOffer = equipmentManager.generateSetOffer({ armor: equipment });
            if (setOffer) {
                offers.push(setOffer);
            }
        }

        // weapon and ability
        for (const weaponId of Object.keys(trashWeapons)) {
            const weapon = equipmentManager.getEquipmentById(weaponId);
            for (const abilityId of Object.keys(trashAbilities)) {
                const ability = equipmentManager.getEquipmentById(abilityId);
                if (!weapon || !ability) {
                    continue;
                }
                const setOffer = equipmentManager.generateSetOffer({ weapon, ability });
                if (setOffer) {
                    offers.push(setOffer);
                }
            }
        }

        // weapon and armor
        for (const weaponId of Object.keys(trashWeapons)) {
            const weapon = equipmentManager.getEquipmentById(weaponId);
            for (const armorId of Object.keys(trashArmors)) {
                const armor = equipmentManager.getEquipmentById(armorId);
                if (!weapon || !armor) {
                    continue;
                }
                const setOffer = equipmentManager.generateSetOffer({ weapon, armor });
                if (setOffer) {
                    offers.push(setOffer);
                }
            }
        }

        // ability and armor
        for (const abilityId of Object.keys(trashAbilities)) {
            const ability = equipmentManager.getEquipmentById(abilityId);
            for (const armorId of Object.keys(trashArmors)) {
                const armor = equipmentManager.getEquipmentById(armorId);
                if (!ability || !armor) {
                    continue;
                }
                const setOffer = equipmentManager.generateSetOffer({ ability, armor });
                if (setOffer) {
                    offers.push(setOffer);
                }
            }
        }

        // all three
        for (const weaponId of Object.keys(trashWeapons)) {
            const weapon = equipmentManager.getEquipmentById(weaponId);
            for (const abilityId of Object.keys(trashAbilities)) {
                const ability = equipmentManager.getEquipmentById(abilityId);
                for (const armorId of Object.keys(trashArmors)) {
                    const armor = equipmentManager.getEquipmentById(armorId);
                    if (!ability || !armor || !weapon) {
                        continue;
                    }
                    const setOffer = equipmentManager.generateSetOffer({ weapon, ability, armor });
                    if (setOffer) {
                        offers.push(setOffer);
                    }
                }
            }
        }

        return offers;
    }

}
