import { EAbilitySlot, EArmorSlot, EWeaponSlot, IEquipment, IOffer } from './index';
import { potionIds } from '../data/potionIds';

export class OfferManager {
    public t10Weapons: IEquipment<10, EWeaponSlot>[] = [];
    public t11Weapons: IEquipment<11, EWeaponSlot>[] = [];
    public t12Weapons: IEquipment<12, EWeaponSlot>[] = [];
    public t5Abilities: IEquipment<5, EAbilitySlot>[] = [];
    public t6Abilities: IEquipment<6, EAbilitySlot>[] = [];
    public t11Armors: IEquipment<11, EArmorSlot>[] = [];
    public t12Armors: IEquipment<12, EArmorSlot>[] = [];
    public t13Armors: IEquipment<13, EArmorSlot>[] = [];

    private computeT5AbilityOffers(): IOffer[] {
        function computeValueOfT5Ability(e: IEquipment<5, EAbilitySlot>) {
            const primary: EAbilitySlot[] = [
                EAbilitySlot.helmet,
                EAbilitySlot.shield,
                EAbilitySlot.seal,
                EAbilitySlot.spell
            ];
            const secondary: EAbilitySlot[] = [
                EAbilitySlot.cloak,
                EAbilitySlot.lute,
                EAbilitySlot.quiver,
            ];
            if (primary.includes(e.slotType)) {
                return potionIds.def;
            } else if (secondary.includes(e.slotType)) {
                return potionIds.wis;
            }
            return potionIds.spd;
        }

        return this.t5Abilities.map(e => ({
            quantity: 1,
            sellingItems: [ e.id ],
            sellingQuantities: [ 1 ],
            buyingItems: [ computeValueOfT5Ability(e) ],
            buyingQuantities: [ 1 ],
            suspended: false,
        }));
    }

    private computeTrashWeaponArmorOffers(): IOffer[] {
        const offers: IOffer[] = [];

        const inCombinations = (weapon: IEquipment, armor: IEquipment) => {
            const combinations: [ EWeaponSlot, EArmorSlot ][] = [
                [ EWeaponSlot.bow, EArmorSlot.light ],
                [ EWeaponSlot.bow, EArmorSlot.robe ],
                [ EWeaponSlot.dagger, EArmorSlot.light ],
                [ EWeaponSlot.katana, EArmorSlot.light ],
                [ EWeaponSlot.katana, EArmorSlot.heavy ],
                [ EWeaponSlot.staff, EArmorSlot.robe ],
                [ EWeaponSlot.wand, EArmorSlot.robe ],
                [ EWeaponSlot.sword, EArmorSlot.heavy ],
            ];

            for (const c of combinations) {
                if (c[0] === weapon.slotType && c[1] === armor.slotType) {
                    return true;
                }
            }
            return false;
        };

        const trashWeapons = [ ...this.t10Weapons, ...this.t11Weapons ];
        const trashArmors = [ ...this.t11Armors, ...this.t12Armors ];
        for (const trashWeapon of trashWeapons) {
            for (const trashArmor of trashArmors) {
                if (inCombinations(trashWeapon, trashArmor)) {
                    const isSlightBetter = trashWeapon.tier === 11 && trashArmor.tier === 12;
                    offers.push({
                        quantity: 1,
                        sellingItems: [ trashWeapon.id, trashWeapon.id ],
                        sellingQuantities: [ 1, 1 ],
                        buyingItems: [ isSlightBetter ? potionIds.wis : potionIds.spd ],
                        buyingQuantities: [ 1 ],
                        suspended: false,
                    });
                }
            }
        }

        return offers;
    }

    public computeTradesString() {
        const t5AbilityOffers = this.computeT5AbilityOffers();
        const trashWeaponArmorOffers = this.computeTrashWeaponArmorOffers();

        const allOffers = [ ...t5AbilityOffers, ...trashWeaponArmorOffers ];
        return JSON.stringify(allOffers);
    }
}
