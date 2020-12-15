import { IOffer, IStock } from './index';

export abstract class Broker {
    public abstract stocks: IStock[];
    public abstract get offers(): IOffer[];
}
