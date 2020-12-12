import { createBrowserHistory, History } from 'history';
import { ITrades } from './types';
import { makeAutoObservable } from 'mobx';

export class AppStore {
	constructor(public history: History) {
		makeAutoObservable(this);
	}

	async asyncInits() {
		//
	}

	public errorMessage: string = '';
	public successMessage: string = '';

	public trades: ITrades = [];
}

export const appStore = new AppStore(createBrowserHistory());
