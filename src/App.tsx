import React, { useEffect } from 'react';
import { CssBaseline, MuiThemeProvider, StylesProvider } from '@material-ui/core';
import { Provider } from 'mobx-react';
import { appStore } from './AppStore';
import { defaultTheme } from './styles/theme';
import { Main } from './Main';
import './App.css'

export function App() {

	useEffect(() => {
		appStore.asyncInits().catch(e => appStore.setError(e.message));
	}, []);

	return <CssBaseline>
		<MuiThemeProvider theme={ defaultTheme }>
			<StylesProvider injectFirst={ true }>
				<Provider appStore={ appStore }>
					<Main/>
				</Provider>
			</StylesProvider>
		</MuiThemeProvider>
	</CssBaseline>;
}
