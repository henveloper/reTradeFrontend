import React from 'react';
import { IDefaultProps } from '../styles/styles';
import { Grid, Link } from '@material-ui/core';
import { EquipmentStocks } from './shared/EquipmentStocks';
import { ImportExport } from './views/ImportExport';
import { Calculator } from './utils/Calculator';

export function RootView(props: IDefaultProps) {
	const { styles } = props;

	const weaponTypes = [ 'dagger', 'bow', 'staff', 'wand', 'sword', 'katanas' ];
	// const abilityTypes = [
	// 	'cloak', 'quiv', 'spell', 'tome',
	// 	'helms', 'shield', 'seal', 'poison',
	// 	'skulls', 'traps', 'orbs', 'prisms',
	// 	'scepters', 'stars', 'waki', 'lutes',
	// ];
	// const armorTypes = [ 'light', 'heavy', 'robe' ];

	return <Grid container direction='column' spacing={ 3 }>
		<Grid item>
			<img src='https://i.ytimg.com/vi/if-2M3K1tqk/maxresdefault.jpg' style={ { width: '100%' } }/>
		</Grid>


		<Grid item container spacing={ 2 }>
			<Grid item xs>
				<EquipmentStocks styles={ styles } variant='weapon'/>
			</Grid>
			<Grid item xs>
				<EquipmentStocks styles={ styles } variant='armor'/>
			</Grid>
		</Grid>

		<Grid item container spacing={ 2 }>
			<Grid item xs>
				<EquipmentStocks styles={ styles } variant='ability'/>
			</Grid>
			<Grid item container direction='column' xs spacing={ 3 }>
				<Grid item container justify='center'>
					<Link href='https://www.realmeye.com/edit-offers-by/SaintBen'>
						RealmEye
					</Link>
				</Grid>
				<Grid item>
					<Calculator styles={ styles }/>
				</Grid>
				<Grid item>
					<ImportExport styles={ styles }/>
				</Grid>
			</Grid>
		</Grid>


	</Grid>;
}
