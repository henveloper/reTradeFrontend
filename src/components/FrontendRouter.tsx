import { Route, Router, Switch } from 'react-router';
import { appStore } from '../AppStore';
import React from 'react';
import { IDefaultProps } from '../styles/styles';
import { observer } from 'mobx-react';
import { HomeView } from './HomeView';

export const FrontendRouter = observer((props: IDefaultProps) => {
    const { styles } = props;

    return <Router history={ appStore.history }>
        <Switch>
            <Route>
                <HomeView styles={ styles }/>
            </Route>
        </Switch>
    </Router>;
});
