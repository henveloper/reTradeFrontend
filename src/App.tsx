import React, { useEffect } from 'react';
import { MuiThemeProvider, StylesProvider, CssBaseline } from "@material-ui/core";
import { Provider } from 'mobx-react'
import { appStore } from "./AppStore";
import { defaultTheme } from "./styles/theme";
import { Main } from "./Main";

export function App() {

	useEffect(() => {
		document.body.style.backgroundImage = "url('https://i.ytimg.com/vi/hkMTD41s7Ts/maxresdefault.jpg')";
		document.body.style.backgroundPosition = 'top center';
		document.body.style.backgroundRepeat = 'no-repeat';
		document.body.style.backgroundColor = 'white';
		document.body.style.backgroundAttachment = 'fixed';

		appStore.asyncInits().catch(console.log);
	}, []);

	return <CssBaseline>
		<MuiThemeProvider theme={defaultTheme }>
			<StylesProvider injectFirst={ true }>
				<Provider appStore={ appStore }>
					<Main/>
				</Provider>
			</StylesProvider>
		</MuiThemeProvider>
	</CssBaseline>;
}
