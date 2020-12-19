import React, { useState } from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Button, FormControlLabel, Grid, Link, Switch, TextField, Typography } from '@material-ui/core';
import { appStore } from '../../AppStore';
import CopyToClipboard from 'react-copy-to-clipboard';
import { observer } from 'mobx-react';
import { equipmentManager } from '../../shareHolders/EquipmentManager';
import { EPotionIds } from '../../data/itemIds';

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

            <Grid item container direction='column' xs style={ { overflowY: 'scroll' } }>
                <Grid item>
                    <Button fullWidth variant='contained'
                            onClick={ () => marketManager.importStocksString(importField) }>
                        Copy Trades
                    </Button>
                </Grid>

                <Grid item>
                    <TextField variant='outlined' fullWidth multiline value={ marketManager.tradeString }/>
                </Grid>
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

            <Grid item container direction='column' spacing={ 1 }
                  style={ { maxHeight: 400, overflowY: 'scroll', flexWrap: 'nowrap' } }>
                { marketManager.equipmentMarketSupervisor.offers.map(o => <Grid item container alignItems='center'>
                    <Grid item container xs spacing={ 1 }>
                        { o.sellingItems.map(i => {
                            const equipment = equipmentManager.getEquipmentById(i);
                            return <Grid item container xs={ 3 }>
                                <img alt={ equipment?.name ?? i.toString() }
                                     src={ equipmentManager.getEquipmentById(i)?.image }/>
                            </Grid>;
                        }) }
                    </Grid>

                    <Grid item container xs>
                        <Typography>
                            { o.buyingItems
                                .map(id => EPotionIds[+id])
                                .map((name, i) => `${ o.buyingQuantities[i] } ${ name }`)
                                .join(' + ') }
                        </Typography>
                    </Grid>
                </Grid>) }
            </Grid>
        </Grid>
    </Grid>;
});
