import { createBrowserHistory, History } from 'history';
import xml from './data/Objects.xml'

export class AppStore {
	constructor(public history: History) {
		//
	}

	async asyncInits() {
		//
	}

	public parse() {
		const xmlData = ('src/data/Objects.xml');
		console.log(xmlData.toString());
	}

}

export const appStore = new AppStore(createBrowserHistory());
