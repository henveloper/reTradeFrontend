import React from 'react';
import { IDefaultProps } from '../styles/styles';
import { Grid } from '@material-ui/core';
import { ItemStocks } from './shared/ItemStocks';
import { ImportExport } from './views/ImportExport';
import { EquipmentTable } from './shared/EquipmentTable';
import { PotionTable } from './shared/PotionTable';

export function RootView(props: IDefaultProps) {
	const { styles } = props;

	return <Grid container direction='column' spacing={ 3 }>

		<Grid item>
			<img src='https://i.ytimg.com/vi/if-2M3K1tqk/maxresdefault.jpg' style={ { width: '100%' } }/>
		</Grid>

		<Grid item>
			<ImportExport styles={ styles }/>
		</Grid>


		<Grid item>
			<ItemStocks styles={ styles } header='Weapon'>
				<EquipmentTable variant='weapon' styles={ styles }/>
			</ItemStocks>
		</Grid>

		<Grid item>
			<ItemStocks styles={ styles } header='Armor'>
				<EquipmentTable variant='armor' styles={ styles }/>
			</ItemStocks>
		</Grid>

		<Grid item>
			<ItemStocks styles={ styles } header='Abilities'>
				<EquipmentTable variant='ability' styles={ styles }/>
			</ItemStocks>
		</Grid>

		<Grid item>
			<ItemStocks styles={ styles } header='Potions'>
				<PotionTable styles={ styles }/>
			</ItemStocks>
		</Grid>


	</Grid>;
}
