import React, { useState } from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Button, Collapse, Grid, TextField } from '@material-ui/core';
import { appStore } from '../../AppStore';

export function ImportExport(props: IDefaultProps) {
    const [ transitionIn, setTransitionIn ] = useState(false);
    const [ textFieldValue, setTextFieldValue ] = useState('');

    function tradeExport() {
        setTextFieldValue(appStore.trades.map(t => `${ t.id }, ${ t.quantity }`).join('\n'));
    }

    function tradeImport() {
        if (textFieldValue === '') {
            console.log(123);
            appStore.errorMessage = 'I believe you did not meant to do this.';
            console.log(234);
            return;
        }
        console.log(345);
        for (const trade of textFieldValue.split('\n')) {
            const [ id, quant ] = trade.split(', ');
            if (!id || !quant) {
                appStore.errorMessage = `Error importing, line: "${ trade }"`;
                return;
            }
            const [] = [];
        }
    }


    return <Grid container direction='column' spacing={ 1 }>

        <Grid item>
            <Button fullWidth variant='contained' onClick={ () => setTransitionIn(!transitionIn) }>
                Import / Export
            </Button>
        </Grid>

        <Grid item>
            <Collapse in={ transitionIn }>
                <Grid container direction='column' spacing={ 1 }>

                    <Grid item container spacing={ 1 }>

                        <Grid item xs={ 6 }>
                            <Button fullWidth variant='outlined' onClick={ tradeExport }>
                                Export trades
                            </Button>
                        </Grid>

                        <Grid item xs={ 6 }>
                            <Button fullWidth variant='outlined' onClick={ tradeImport }>
                                Import trades
                            </Button>
                        </Grid>

                    </Grid>

                    <Grid item>
                        <TextField fullWidth variant='outlined' value={ textFieldValue }
                                   onChange={ e => setTextFieldValue(e.target.value) }/>
                    </Grid>

                </Grid>
            </Collapse>
        </Grid>
    </Grid>;
}
