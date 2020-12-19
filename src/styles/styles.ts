import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = () => makeStyles<any, any, styleKeys>((theme: Theme) => ({
    fullWidth: { width: '100%' },
}));

type styleKeys = 'fullWidth';

export interface IDefaultProps {
    styles: Record<styleKeys, string>;
};
