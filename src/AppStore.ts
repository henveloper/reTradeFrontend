import { createBrowserHistory, History } from 'history';
import axios, { AxiosError } from 'axios';
import { IAPIOffer, IStocks } from './types';
import { makeAutoObservable } from 'mobx';
import { abilityIds, armorIds, weaponIds } from './data/objectIds';
import { potionIds } from './data/potionIds';
import * as querystring from 'querystring';

export class AppStore {
    constructor(public history: History) {
        makeAutoObservable(this);
    }

    async asyncInits() {
        //
    }

    public errorMessage: string = '';
    public successMessage: string = '';

    public stocks: IStocks = [];

    public addStocksQuantity(id: number) {
        const found = this.stocks.find(t => t.id === t.id);
        if (found) {
            found.quantity += 1;
        } else {
            this.stocks.push({ id, quantity: 1 });
        }
    }

    public deductStocksQuantity(id: number) {
        const found = this.stocks.find(t => t.id === t.id);
        if (found) {
            found.quantity -= 1;
            if (found.quantity === 0) {
                this.stocks = this.stocks.filter(t => t.quantity > 0);
            }
        }
    }

    public async sendOffer(token: string) {

        const { stocks } = this;
        const offers: IAPIOffer[] = [];

        // compute offers
        const dagger = 0;
        const bow = 1;
        const staff = 2;
        const wand = 3;
        const sword = 4;
        const katana = 5;
        const light = 0;
        const heavy = 1;
        const robe = 2;

        const classEquipmentMap = {
            rogue: [ dagger, 0, light ],
            archer: [ bow, 1, light ],
            wizard: [ staff, 2, robe ],
            priest: [ wand, 3, robe ],
            warrior: [ sword, 4, heavy ],
            knight: [ sword, 5, heavy ],
            paladin: [ sword, 6, heavy ],
            assassin: [ dagger, 7, light ],
            necromancer: [ staff, 8, robe ],
            huntress: [ bow, 9, light ],
            mystic: [ staff, 10, robe ],
            trickster: [ dagger, 11, light ],
            sorcerer: [ wand, 12, robe ],
            ninja: [ katana, 13, light ],
            samurai: [ katana, 14, heavy ],
            bard: [ bow, 15, robe ],
        };

        // only cheap entries here.
        const bulkOffers: number[][] = [];
        for (const [ weaponIndex, abilityIndex, armorIndex ] of Object.values(classEquipmentMap)) {
            for (const weaponId of weaponIds[weaponIndex].slice(0, armorIds[armorIndex].length - 1)) {
                for (const abilityId of abilityIds[abilityIndex].slice(0, armorIds[armorIndex].length - 1)) {
                    for (const armorId of armorIds[armorIndex].slice(0, armorIds[armorIndex].length - 1)) {
                        const weaponStock = stocks.find(t => t.id === armorId);
                        const abilityStock = stocks.find(t => t.id === abilityId);
                        const armorStock = stocks.find(t => t.id === armorId);
                        if (weaponStock && abilityStock && armorStock) {
                            bulkOffers.push([ weaponStock.id, abilityStock.id, armorStock.id ]);
                        } else if (!weaponStock && abilityStock && armorStock) {
                            bulkOffers.push([ abilityStock.id, armorStock.id ]);
                        } else if (weaponStock && !abilityStock && armorStock) {
                            bulkOffers.push([ weaponStock.id, armorStock.id ]);
                        } else if (weaponStock && abilityStock && !armorStock) {
                            bulkOffers.push([ weaponStock.id, abilityStock.id ]);
                        }
                    }
                }
            }
        }
        for (const bulkOffer of bulkOffers) {
            offers.push({
                quantity: 1,
                sellingItems: bulkOffer,
                sellingQuantities: Array.from({ length: bulkOffer.length }, v => 1),
                buyingItems: [ potionIds.def ],
                buyingQuantities: [ 1 ],
                suspended: false,
            });
        }

        try {
            await axios.get('https://www.realmeye.com/player/SaintBen');
        } catch (err) {
            console.log(err);
            console.log((err as AxiosError).message)
            console.log((err as AxiosError).request)
            console.log((err as AxiosError).response)
        }

        try {
            const req = await axios.post('https://www.realmeye.com/save-player-offers-service', querystring.stringify({
                player: 'SaintBen',
                trades: '[]',
                session: token,
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
        } catch (err) {
            console.log((err as AxiosError).message)
            console.log((err as AxiosError).request)
            console.log((err as AxiosError).response)
            this.errorMessage = 'Request Error.';
            return;
        }

        this.successMessage = 'Success';
        return;
    }
}

export const appStore = new AppStore(createBrowserHistory());
