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
        let counter = 0;
        for (const weaponId of weaponIds) {
            if (weaponId.includes(id)) {
                console.log('MATCH!!!!');
                return counter;
            }
            counter += 1;
        }
        appStore.errorMessage = `derive type of weapon failed, id: ${ id }`;
        return -1;
    }

    private typeOfArmor(id: number): IArmorIdIndex {
        let counter = 0;
        for (const weaponId of armorIds) {
            if (weaponId.includes(id)) {
                console.log('MATCH!!!!');
                return counter;
            }
            counter += 1;
        }
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

        const inCombinations = (weaponId: number, armorId: number) => {
            const combinations: [ IWeaponIdIndex, IArmorIdIndex ][] = [
                [ IWeaponIdIndex.bow, IArmorIdIndex.light ],
                [ IWeaponIdIndex.bow, IArmorIdIndex.robe ],
                [ IWeaponIdIndex.dagger, IArmorIdIndex.light ],
                [ IWeaponIdIndex.katana, IArmorIdIndex.light ],
                [ IWeaponIdIndex.katana, IArmorIdIndex.heavy ],
                [ IWeaponIdIndex.staff, IArmorIdIndex.robe ],
                [ IWeaponIdIndex.wand, IArmorIdIndex.robe ],
                [ IWeaponIdIndex.sword, IArmorIdIndex.heavy ],
            ];

            const weaponIdType = this.typeOfWeapon(weaponId);
            const armorIdType = this.typeOfArmor(armorId);
            console.log(combinations);
            console.log(weaponIdType, armorIdType);
            for (const c of combinations) {
                if (c[0] === weaponIdType && c[1] === armorIdType) {
                    return true;
                }
            }
            return false;
        };

        const trashWeaponIds = [ ...this.t10WeaponIds, ...this.t11WeaponIds ];
        const trashArmorIds = [ ...this.t11ArmorIds, ...this.t12ArmorIds ];
        for (const trashWeaponId of trashWeaponIds) {
            for (const trashArmorId of trashArmorIds) {
                console.log('weaponArmorLoop');
                if (inCombinations(trashWeaponId, trashArmorId)) {
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
