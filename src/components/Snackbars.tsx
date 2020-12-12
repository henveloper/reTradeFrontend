import React from 'react';
import { Snackbar } from '@material-ui/core';
import { IDefaultProps } from '../styles/styles';
import { Alert } from '@material-ui/lab';
import { appStore } from '../AppStore';
import { observer } from 'mobx-react';

export const SnackBars = observer((props: IDefaultProps) => {
    console.log(appStore.errorMessage);

    const handleCloseError = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        appStore.errorMessage = '';
    };

    const handleCloseSuccess = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        appStore.successMessage = '';
    };
    console.log(appStore.errorMessage, appStore.successMessage);


    return (
        <div style={ { width: '100%' } }>
            { appStore.errorMessage }
            <Snackbar open={ appStore.errorMessage !== '' } autoHideDuration={ 6000 } onClose={ handleCloseError }>
                <Alert onClose={ handleCloseError } severity="error">
                    { appStore.errorMessage }
                </Alert>
            </Snackbar>

            <Snackbar open={ appStore.successMessage !== '' } autoHideDuration={ 6000 } onClose={ handleCloseSuccess }>
                <Alert onClose={ handleCloseSuccess } severity="success">
                    { appStore.successMessage }
                </Alert>
            </Snackbar>
        </div>
    );
});
