import React from 'react';
import { Container } from '@material-ui/core';
import { useStyles } from './styles/styles';
import { FrontendRouter } from './components/FrontendRouter';
import { defaultTheme } from './styles/theme';

export function Main() {
    const styles = useStyles()(defaultTheme);
    return <Container maxWidth='md'>
        <FrontendRouter styles={ styles }/>
    </Container>;
}
