import React from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Grid } from '@material-ui/core';
import { Armors } from './Armors';

export function RootView(props: IDefaultProps) {
	const { styles } = props;

	return <Grid container direction='column'>
		<Grid item>
			<Armors styles={ styles }/>
		</Grid>
		{/*<Grid item>*/ }
		{/*	<Abilities/>*/ }
		{/*</Grid>*/ }
		{/*<Grid item>*/ }
		{/*	<Armors/>*/ }
		{/*</Grid>*/ }
	</Grid>;
}
