import React from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Grid } from '@material-ui/core';
import { Armors } from './Armors';
import { ImportExport } from './ImportExport';
import { SnackBars } from '../Snackbars';

export function RootView(props: IDefaultProps) {
	const { styles } = props;

	return <Grid container direction='column'>

		<Grid item>
			<Armors styles={ styles }/>
		</Grid>

		<Grid item>
			<ImportExport styles={ styles }/>
		</Grid>

	</Grid>;
}
