import { IOffer } from './index';
import { potionIds } from '../data/potionIds';
import { AbilityIdIndex, abilityIds } from '../data/objectIds';

export class TempOfferManager {
    public t10WeaponIds: number[] = [];
    public t11WeaponIds: number[] = [];
    public t12WeaponIds: number[] = [];
    public t5AbilityIds: number[] = [];
    public t6AbilityIds: number[] = [];
    public t11ArmorIds: number[] = [];
    public t12ArmorIds: number[] = [];
    public t13ArmorIds: number[] = [];

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

    public computeTradesString() {
        const t5AbilityOffers = this.computeT5AbilityOffers();

        const allOffers = [ ...t5AbilityOffers, ];
        return JSON.stringify(allOffers);
    }
}


// [{"quantity":1,"sellingItems":[2612,2593],"sellingQuantities":[1,1],"buyingItems":[1826],"buyingQuantities":[1],"suspended":false}]
