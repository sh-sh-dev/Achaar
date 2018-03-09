import palette from './palette';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const theme = getMuiTheme({
    isRtl: true,
    palette,
    fontFamily: 'inherit',
    appBar: {
        padding: 20,
        color: '#fff',
        textColor: '#212121'
    },
    slider: {
        trackSize: 2,
        trackColor: '#dedede',
        trackColorSelected: '#dedede',
        handleColorZero: '#dedede',
        selectionColor: palette.accent1Color,
        rippleColor: palette.accent1Color
    },
    toggle: {
        trackOffColor: '#aaa',
        thumbOffColor: '#d9d9d9',
        trackOnColor: palette.accent3Color,
        thumbOnColor: palette.accent1Color
    },
    radioButton: {
        checkedColor: palette.accent1Color,
        reqiredColor: palette.accent1Color
    },
    spacing: {
        desktopKeylineIncrement: 56,
        desktopDropDownItemHeight: 56 / 2
    },
    inkBar: {
        backgroundColor: palette.primary1Color
    },
    toolbar: {
        backgroundColor: '#fff'
    },
    tabs: {
        backgroundColor: '#fff',
        selectedTextColor: palette.primary1Color,
        textColor: '#888'
    },
    listItem: {
        rightIconColor: 'inherit',
        leftIconColor: 'inherit'
    }
})

export default theme;
