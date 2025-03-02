import {DefaultTheme} from "styled-components";

export const theme: DefaultTheme= {
    colors : {
        //Gray
        gray100: '#F8F8F9',
        gray200: '#F1F1F1',
        gray300: '#E5E5E5',
        gray400: '#D6D6D5',
        gray500: '#C0C0C0',
        gray600: '#A6A5A5',
        gray700: '#898989',
        gray800: '#777777',
        gray900: '#717171',
        gray1000: '#6A6A6A',
        gray1100: '#898989',
        gray1200: '#5F5F5F',
        gray1300: '#545454',
        gray1400: '#3E3E3E',
        gray1500: '#535051',
        gray1600: '#393C3C',

        //Sub color
        sub100: '#E60012',

        //Main color
        main100 : '#6BBC64',
        main200 : '#009857',
        main300 : '#00573D',

        //White
        white : '#FFFFFF'

    },
    typography : {
        headlineL: {
            fontSize: '2rem',
            fontWeight: 700,
            lineHeight: '1.5',
        },
        headlineM: {
            fontSize: '1.5rem',
            fontWeight: 700,
            lineHeight: '1.5',
        },
        headlineS: {
            fontSize: '1.2rem',
            fontWeight: 700,
            lineHeight: '1.5',
        },
        titleL: {
            fontSize: '1rem',
            fontWeight: 700,
            lineHeight: '1.5',
        },
        titleM: {
            fontSize: '0.875rem',
            fontWeight: 700,
            lineHeight: '1.5',
        },
        titleS: {
            fontSize: '1.2rem',
            fontWeight: 700,
            lineHeight: '1.5',
        },
        bodyEL: {
            fontSize: '1.25rem',
            fontWeight: 400,
            lineHeight: '1.5',
        },
        bodyL: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: '1.5',
        },
        bodyM: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: '1.5',
        },
        bodyS: {
            fontSize: '0.75rem',
            fontWeight: 400,
            lineHeight: '1.5',
        },
        buttonEL: {
            fontSize: '1.25rem',
            fontWeight: 700,
            lineHeight: '1.5',
        },
        buttonL: {
            fontSize: '1rem',
            fontWeight: 700,
            lineHeight: '1.5',
        },
        buttonM: {
            fontSize: '0.875rem',
            fontWeight: 600,
            lineHeight: '1.5',
        },
        captionL: {
            fontSize: '0.688rem',
            fontWeight: 400,
            lineHeight: '1.5',
        },
        captionM: {
            fontSize: '0.625rem',
            fontWeight: 400,
            lineHeight: '1.5',
        },
        popupTitleL: {
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: '1.5',
        },
    },
    shadows:{
        shadow100: '0px 1px 2px 0px rgba(0, 0, 0, 0.16)',
        shadow200: '0px 4px 12px 0px rgba(0, 0, 0, 0.25)',
        shadow300: '0px 8px 24px 0px rgba(0, 0, 0, 0.25)',
    }
}
