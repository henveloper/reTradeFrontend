import { createBrowserHistory, History } from 'history';
// import { ApiService } from './services/ApiService';

export class AppStore {
	constructor(public history: History) {
		//
	}

	async asyncInits() {
		//
	}

}

export const appStore = new AppStore(createBrowserHistory());
