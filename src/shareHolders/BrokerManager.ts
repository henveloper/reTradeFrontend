import { EAbilitySlot, EArmorSlot, EWeaponSlot, IEquipment, IOffer, IStock } from './index';
import { EPotionIds } from '../data/itemIds';
import { PotionBroker } from './PotionBroker';

export class BrokerManager {
    public t10Weapons: IEquipment<10, EWeaponSlot>[] = [];
    public t11Weapons: IEquipment<11, EWeaponSlot>[] = [];
    public t12Weapons: IEquipment<12, EWeaponSlot>[] = [];
    public t5Abilities: IEquipment<5, EAbilitySlot>[] = [];
    public t6Abilities: IEquipment<6, EAbilitySlot>[] = [];
    public t11Armors: IEquipment<11, EArmorSlot>[] = [];
    public t12Armors: IEquipment<12, EArmorSlot>[] = [];
    public t13Armors: IEquipment<13, EArmorSlot>[] = [];
    public potionStocks: IStock[] = [];

    public potionBroker = new PotionBroker();

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
                return EPotionIds.def;
            } else if (secondary.includes(e.slotType)) {
                return EPotionIds.wis;
            }
            return EPotionIds.spd;
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
                    const isBetter = trashWeapon.tier === 11 && trashArmor.tier === 12;
                    const isSlightlyBetter = trashWeapon.tier === 11 || trashArmor.tier === 12;
                    offers.push({
                        quantity: 1,
                        sellingItems: [ trashWeapon.id, trashArmor.id ],
                        sellingQuantities: [ 1, 1 ],
                        buyingItems: [ isBetter ? EPotionIds.def : (isSlightlyBetter ? EPotionIds.wis : EPotionIds.spd) ],
                        buyingQuantities: [ 1 ],
                        suspended: false,
                    });
                }
            }
        }

        return offers;
    }

    public computePotionOffers(): IOffer[] {
        const offers: IOffer[] = [];
        const ratios: Partial<Record<EPotionIds, number>> = {
            [EPotionIds.atk]: 6,
            [EPotionIds.def]: 4,
            [EPotionIds.dex]: 8,
            [EPotionIds.spd]: 8,
            [EPotionIds.vit]: 4,
            [EPotionIds.wis]: 6,
        };

        for (const potionStock of this.potionStocks) {
            if (ratios[potionStock.id as EPotionIds]) {
                offers.push({
                    sellingItems: [ potionStock.id ],
                    sellingQuantities: [],
                    quantity: 1,
                    buyingItems: [ EPotionIds.glife ],
                    buyingQuantities: [],
                    suspended: false,
                });
            }
        }

        return offers;
    }

    public computeTradesString() {
        const allOffers = [
            ...this.computePotionOffers(),
            ...this.computeTrashWeaponArmorOffers(),
            ...this.computeT5AbilityOffers(),
            ...this.potionBroker.offers,
        ];
        return JSON.stringify(allOffers);
    }
}