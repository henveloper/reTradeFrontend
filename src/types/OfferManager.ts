import { IOffer } from './index';
import { potionIds } from '../data/potionIds';
import { AbilityIdIndex, abilityIds, armorIds, IArmorIdIndex, IWeaponIdIndex, weaponIds } from '../data/objectIds';
import { appStore } from '../AppStore';

export class OfferManager {
    public t10WeaponIds: number[] = [];
    public t11WeaponIds: number[] = [];
    public t12WeaponIds: number[] = [];
    public t5AbilityIds: number[] = [];
    public t6AbilityIds: number[] = [];
    public t11ArmorIds: number[] = [];
    public t12ArmorIds: number[] = [];
    public t13ArmorIds: number[] = [];

    private typeOfWeapon(id: number): IWeaponIdIndex {
        weaponIds.forEach((v, i) => {
            if (v.includes(id)) {
                return i;
            }
        });
        appStore.errorMessage = `derive type of weapon failed, id: ${ id }`;
        return -1;
    }

    private typeOfArmor(id: number): IArmorIdIndex {
        armorIds.forEach((v, i) => {
            if (v.includes(id)) {
                return i;
            }
        });
        appStore.errorMessage = `derive type of armor failed, id: ${ id }`;
        return -1;
    }


    private computeT5AbilityOffers(): IOffer[] {
        function computeValueOfT5Ability(id: number) {
            const index = abilityIds.map(t => t[0]).indexOf(id);
            const primary: AbilityIdIndex[] = [
                AbilityIdIndex.helm,
                AbilityIdIndex.shield,
                AbilityIdIndex.seal,
                AbilityIdIndex.spell
            ];
            const secondary: AbilityIdIndex[] = [
                AbilityIdIndex.cloak,
                AbilityIdIndex.lute,
                AbilityIdIndex.quiver,
            ];
            if (primary.includes(index)) {
                return potionIds.def;
            } else if (secondary.includes(index)) {
                return potionIds.wis;
            }
            return potionIds.spd;
        }

        return this.t5AbilityIds.map(id => ({
            quantity: 1,
            sellingItems: [ id ],
            sellingQuantities: [ 1 ],
            buyingItems: [ computeValueOfT5Ability(id) ],
            buyingQuantities: [ 1 ],
            suspended: false,
        }));
    }

    private computeTrashWeaponArmorOffers(): IOffer[] {
        const offers: IOffer[] = [];

        const trashWeaponIds = [ ...this.t10WeaponIds, ...this.t11WeaponIds ];
        const trashArmorIds = [ ...this.t11ArmorIds, ...this.t12ArmorIds ];
        for (const trashWeaponId of trashWeaponIds) {
            for (const trashArmorId of trashArmorIds) {
                offers.push({
                    quantity: 1,
                    sellingItems: [ trashWeaponId, trashArmorId ],
                    sellingQuantities: [ 1, 1 ],
                    buyingItems: [ (this.t12ArmorIds.includes(trashArmorId) && this.t11WeaponIds.includes(trashWeaponId)) ? potionIds.wis : potionIds.spd ],
                    buyingQuantities: [ 1 ],
                    suspended: false,
                });
            }
        }

        return offers;
    }

    public computeTradesString() {
        const t5AbilityOffers = this.computeT5AbilityOffers();
        const trashWeaponArmorOffers = this.computeTrashWeaponArmorOffers();

        const allOffers = [ ...t5AbilityOffers, trashWeaponArmorOffers ];
        return JSON.stringify(allOffers);
    }
}
