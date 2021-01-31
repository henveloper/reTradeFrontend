import React, { useState } from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Button, FormControlLabel, Grid, IconButton, Link, Switch, TextField, Typography } from '@material-ui/core';
import { appStore } from '../../AppStore';
import CopyToClipboard from 'react-copy-to-clipboard';
import { observer } from 'mobx-react';
import { equipmentManager } from '../../shareHolders/EquipmentManager';
import { EPotionIds } from '../../data/itemIds';
import { LocalGroceryStore } from '@material-ui/icons';

export const ImportExport = observer((props: IDefaultProps) => {
    const { marketManager } = appStore;
    const [ importField, setImportField ] = useState('');

    return <Grid container spacing={ 1 }>

        <Grid item container direction='column' alignItems='center' xs
              style={ { height: 480, overflowY: 'hidden', flexWrap: 'nowrap' } } spacing={ 1 }>

            <Grid item container direction='column' xs style={ { overflowY: 'scroll', flexWrap: 'nowrap' } }>
                <Grid item>
                    <Button fullWidth variant='contained'
                            onClick={ () => {
                                const success = marketManager.importStocksString(importField);
                                if (success) {
                                    setImportField('');
                                }
                            } }>
                        Stocks Import
                    </Button>
                </Grid>

                <Grid item>
                    <TextField variant='outlined' fullWidth multiline value={ importField }
                               onChange={ e => setImportField(e.target.value) }/>
                </Grid>
            </Grid>

            <Grid item container direction='column' xs style={ { overflowY: 'scroll' } }>
                <TextField helperText='export' variant='outlined' fullWidth multiline
                           value={ marketManager.exportString }/>
            </Grid>

            <Grid item container xs style={ { overflowY: 'scroll' } }>
                <TextField variant='outlined' fullWidth multiline value={ marketManager.tradeString }/>
            </Grid>

        </Grid>

        <Grid item container direction='column' alignItems='center' xs
              style={ { height: 480, overflowY: 'hidden', flexWrap: 'nowrap' } }
              spacing={ 1 }>

            <Grid item container alignItems='center'>
                <Grid item container xs justify='center'>
                    <Link href='https://www.realmeye.com/edit-offers-by/SaintBen' variant='button'>
                        RealmEye
                    </Link>
                </Grid>
                <Grid item container xs justify='center'>
                    <FormControlLabel
                        control={ <Switch checked={ marketManager.busy }
                                          onChange={ marketManager.toggleBusy }/> }
                        label="Busy"/>
                </Grid>
            </Grid>

            <Grid item container>
                <Grid item xs>
                    <CopyToClipboard text={ marketManager.tradeString }>
                        <Button fullWidth variant='text' onClick={ () => appStore.successMessage = 'copied' }>
                            Copy Offer
                        </Button>
                    </CopyToClipboard>
                </Grid>
                <Grid item xs>
                    <Button fullWidth variant='text' onClick={ marketManager.randomize }>
                        Randomize
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    </Grid>;
});
