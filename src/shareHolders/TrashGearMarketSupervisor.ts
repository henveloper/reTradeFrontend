import { MarketSupervisor } from './MarketSupervisor';
import { IOffer, TEquipmentTypes } from './index';
import { Equipment, equipmentManager, ISet } from './EquipmentManager';
import { computed } from 'mobx';

export class TrashGearMarketSupervisor extends MarketSupervisor {
    constructor() {
        super();
    }

    private generateSets(weapons: Equipment[], abilities: Equipment[], armors: Equipment[]): ISet[] {
        const setBuilder = (srcArr: Equipment[], variant: TEquipmentTypes, previousSets: ISet[]) => {
            srcArr.forEach(e => {
                previousSets.filter(s => s[variant] === undefined).forEach((v) => {
                    previousSets.push({
                        weapon: variant === 'weapon' ? e : v.weapon,
                        ability: variant === 'ability' ? e : v.ability,
                        armor: variant === 'armor' ? e : v.armor,
                    });
                });
            });
            srcArr.forEach(e => {
                previousSets.push({
                    weapon: variant === 'weapon' ? e : undefined,
                    ability: variant === 'ability' ? e : undefined,
                    armor: variant === 'armor' ? e : undefined,
                });
            });
        };
        const sets: ISet[] = [];

        ([
            [ weapons, 'weapon' ],
            [ abilities, 'ability' ],
            [ armors, 'armor' ],
        ] as [ Equipment[], TEquipmentTypes ][])
            .forEach(([ srcArr, variant ], i) => {
                setBuilder(srcArr, variant, sets);
            });

        return sets;
    }

    @computed
    get offers(): IOffer[] {
        const getEquipments = (variant: string, tiers: number[]): Equipment[] => {
            return Array.from(this.stocks.keys()).reduce<Equipment[]>((p, c) => {
                const equipment = equipmentManager.getEquipmentById(c);
                if (equipment?.type === variant && (tiers.includes(equipment.tier))) {
                    p.push(equipment);
                }
                return p;
            }, []);
        };

        const allSets: ISet[] = [ ...this.generateSets(getEquipments('weapon', [ 12 ]), [], []),
            ...this.generateSets([], getEquipments('ability', [ 6 ]), []),
            ...this.generateSets([], [], getEquipments('armor', [ 13 ])),
            ...this.generateSets(
                getEquipments('weapon', [ 10, 11 ]),
                getEquipments('ability', [ 5 ]),
                getEquipments('armor', [ 11, 12 ]),
            ) ];
        return allSets.map(equipmentManager.generateSetOffer).filter((o): o is IOffer => o !== undefined);
    }

}
