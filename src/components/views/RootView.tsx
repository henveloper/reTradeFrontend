import { Route, Router, Switch } from "react-router";
import React from "react";
import { IDefaultProps } from "../../styles/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import { appStore } from "../../AppStore";

export function RootView(props: IDefaultProps) {
	const {styles} = props;

	return <Grid container direction='column'>
		<Grid item container>
			<Typography variant='h6' >
				this is some text
			</Typography>
		</Grid>

		<Grid item container>
			{[0,1].map((t, i) => <Grid item container xs={6}>
				<img className={styles.fullWidth} alt={i.toString()} src='https://media0.giphy.com/media/g7GKcSzwQfugw/giphy.gif'/>
			</Grid>)}
		</Grid>

	</Grid>
}
