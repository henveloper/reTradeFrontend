import { createBrowserHistory, History } from 'history';
import { makeAutoObservable } from 'mobx';
import { StockManager } from './types/StockManager';

export class AppStore {
    constructor(public history: History) {
        makeAutoObservable(this);
    }

    async asyncInits() {
        //
    }

    public errorMessage: string = '';
    public successMessage: string = '';

    public stockManager = new StockManager();
}

export const appStore = new AppStore(createBrowserHistory());
