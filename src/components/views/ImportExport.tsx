import React, { useState } from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Button, Checkbox, Collapse, FormControlLabel, Grid, TextField } from '@material-ui/core';
import { appStore } from '../../AppStore';
import { IStocks } from '../../types';
import Joi from 'joi';

export function ImportExport(props: IDefaultProps) {
    const [ transitionIn, setTransitionIn ] = useState(false);
    const [ textFieldValue, setTextFieldValue ] = useState('');
    const [ editable, setEditable ] = useState(false);

    function stockExport() {
        setTextFieldValue(appStore.stocks.map(t => `${ t.id }, ${ t.quantity }`).join('\n'));
        appStore.successMessage = 'Trade exported.';
    }

    function stockImport() {
        if (textFieldValue === '') {
            appStore.errorMessage = 'I believe you did not meant to do this.';
            return;
        }

        const stocks: IStocks = [];
        for (const trade of textFieldValue.split('\n')) {
            const [ id, quantity ] = trade.split(', ');
            const schema = Joi.object({
                id: Joi.number().integer().min(1).required(),
                quantity: Joi.number().integer().min(1).max(99).required(),
            });
            const validation = schema.validate({ id, quantity });
            if (validation.error) {
                appStore.errorMessage = validation.error.message;
                return;
            }
            const { value } = validation;
            stocks.push({ id: +value.id, quantity: +value.quantity });
        }
        appStore.successMessage = 'Trade imported.';
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
                            <Button fullWidth variant='outlined' onClick={ stockExport }>
                                Export stocks
                            </Button>
                        </Grid>

                        <Grid item xs={ 5 }>
                            <Button fullWidth variant='outlined' onClick={ stockImport }>
                                Import stocks
                            </Button>
                        </Grid>

                        <Grid item xs={ 1 }>
                            <FormControlLabel
                                control={ <Checkbox value={ editable } onChange={ () => setEditable(!editable) }/> }
                                label="edit"
                            />
                        </Grid>

                    </Grid>

                    <Grid item>
                        <TextField fullWidth variant='outlined' value={ textFieldValue } multiline
                                   disabled={ !editable }
                                   onChange={ e => setTextFieldValue(e.target.value) }
                                   helperText='trades'
                        />
                    </Grid>

                </Grid>
            </Collapse>
        </Grid>
    </Grid>;
}
