import React from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Grid } from '@material-ui/core';
import { EquipmentStocks } from './EquipmentStocks';
import { ImportExport } from './ImportExport';
import { abilities, armors, weapons } from '../../data/objectIds';
import { Requester } from '../shared/Requester';

export function RootView(props: IDefaultProps) {
	const { styles } = props;

	const weaponTypes = [ 'dagger', 'bow', 'staff', 'wand', 'sword', 'katanas' ];
	const abilityTypes = [
		'cloak', 'quiv', 'spell', 'tome',
		'helms', 'shield', 'seal', 'poison',
		'skulls', 'traps', 'orbs', 'prisms',
		'scepters', 'stars', 'waki', 'lutes',
	];
	const armorTypes = [ 'light', 'heavy', 'robe' ];

	return <Grid container direction='column' spacing={ 3 }>
		<Grid item>
			<img src='https://i.ytimg.com/vi/if-2M3K1tqk/maxresdefault.jpg' style={ { width: '100%' } }/>
		</Grid>

		<Grid item container>
			<Grid item xs={ 6 }>
				<EquipmentStocks type='weapons' styles={ styles } data={ weapons } maxTier={ 12 }
								 types={ weaponTypes }/>
			</Grid>

			<Grid item xs={ 6 }>
				<EquipmentStocks type='armors' styles={ styles } data={ armors } maxTier={ 13 } types={ armorTypes }/>
			</Grid>
		</Grid>

		<Grid item container>
			<Grid item xs={ 6 }>
				<EquipmentStocks type='abilities' styles={ styles } data={ abilities } maxTier={ 6 }
								 types={ abilityTypes }/>
			</Grid>

			<Grid item>
				<Requester/>
			</Grid>
		</Grid>

		<Grid item>
			<ImportExport styles={ styles }/>
		</Grid>

	</Grid>;
}
