import React from 'react';
import { IDefaultProps } from '../styles/styles';
import { Grid } from '@material-ui/core';
import { ItemStocks } from './shared/ItemStocks';
import { ImportExport } from './views/ImportExport';
import { PotionTable } from './shared/PotionTable';
import { MiscItemTable } from './shared/MiscItemTable';
import { appStore } from '../AppStore';

export function HomeView(props: IDefaultProps) {
	const { styles } = props;
	const { marketManager: { miscMarketSupervisor } } = appStore;

	return <Grid container direction='column' spacing={ 3 }>
		<Grid item container justify='center'>
			<img src='https://i1.wp.com/doublesama.com/wp-content/uploads/2020/07/Lolis-in-Anime-1.jpg?fit=640%2C360'/>
		</Grid>

		<Grid item>
			<ImportExport styles={ styles }/>
		</Grid>

		<Grid item container>
			<ItemStocks styles={ styles } header='Potions'>
				<PotionTable styles={ styles }/>
			</ItemStocks>
		</Grid>

		<Grid item>
			<ItemStocks styles={ styles } header='Misc'>
				<MiscItemTable styles={ styles }/>
			</ItemStocks>
		</Grid>

	</Grid>;
}
