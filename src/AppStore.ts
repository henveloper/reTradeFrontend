import { createBrowserHistory, History } from 'history';
import { IStocks } from './types';
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

}

export const appStore = new AppStore(createBrowserHistory());
