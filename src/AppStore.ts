import { createBrowserHistory, History } from 'history';
import { action, makeAutoObservable, observable } from 'mobx';
import { StockManager } from './shareHolders/StockManager';
import { BrokerManager } from './shareHolders/BrokerManager';

export class AppStore {
    constructor(public history: History) {
        makeAutoObservable(this);
    }

    async asyncInits() {
        //
    }

    @observable
    public errorMessage: string = '';

    @action
    public setError(msg: string) {
        this.errorMessage = msg;
    }

    public successMessage: string = '';

    @action
    public setSuccess(msg: string) {
        this.successMessage = msg;
    }

    public stockManager = new StockManager();

    public brokerManager = new BrokerManager();
}

export const appStore = new AppStore(createBrowserHistory());
