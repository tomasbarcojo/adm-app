import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SideBar from './SideBar'

const useStyles = makeStyles((theme) => ({
	root: {
    display: 'flex',
  },
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
}));

export default function Main() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<SideBar />

			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={3}>
						<h1>Holiwis</h1>
					</Grid>
				</Container>
			</main>
		</div>
	)
}
