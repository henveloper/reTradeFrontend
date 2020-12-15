import { PotionBroker } from './PotionBroker';
import { TrashGearBroker } from './TrashGearBroker';

export class BrokerManager {

    public potionBroker = new PotionBroker();

    public trashGearBroker = new TrashGearBroker();

    public get tradeString() {
        const allOffers = [
            ...this.potionBroker.offers,
            ...this.trashGearBroker.offers,
        ];
        return JSON.stringify(allOffers);
    }
}
