import React from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Grid, Link } from '@material-ui/core';
import { EquipmentStocks } from './EquipmentStocks';
import { ImportExport } from './ImportExport';
import { abilityIds, armorIds, weaponIds } from '../../data/objectIds';
import { Calculator } from '../shared/Calculator';

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

		<Grid item container justify='center'>
			<Link href='https://www.realmeye.com/edit-offers-by/SaintBen'>
				myRealmEyePage
			</Link>
		</Grid>

		<Grid item>
			<ImportExport styles={ styles }/>
		</Grid>

		<Grid item container>
			<Grid item xs={ 6 }>
				<EquipmentStocks type='weapons' styles={ styles } data={ weaponIds } maxTier={ 12 }
								 types={ weaponTypes }/>
			</Grid>
			{/*<Grid item container direction='column' xs={ 6 } spacing={ 5 }>*/}
			{/*	<Grid item>*/}
			{/*		<EquipmentStocks type='armors' styles={ styles } data={ armorIds } max*/}
			{/*						 types={ armorTypes }/>*/}
			{/*	</Grid>*/}

			{/*	<Grid item>*/}
			{/*		<Calculator styles={ styles }/>*/}
			{/*	</Grid>*/}
			{/*</Grid>*/}
		</Grid>

		{/*<Grid item xs={ 6 }>*/}
		{/*	<EquipmentStocks type='abilities' styles={ styles } data={ abilityIds } maxTier={ 6 }*/}
		{/*					 types={ abilityTypes }/>*/}
		{/*</Grid>*/}

	</Grid>;
}
