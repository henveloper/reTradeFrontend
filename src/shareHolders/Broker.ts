import { IOffer, IStock } from './index';
import { makeAutoObservable } from 'mobx';

export abstract class Broker {

    protected constructor() {
        makeAutoObservable(this);
    }

    public abstract get offers(): IOffer[];

}
