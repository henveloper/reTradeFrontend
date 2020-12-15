import { createBrowserHistory, History } from 'history';
import { action, makeAutoObservable, observable } from 'mobx';
import { MarketManager } from './shareHolders/MarketManager';

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

    public marketManager = new MarketManager();
}

export const appStore = new AppStore(createBrowserHistory());
