import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            gray100: string;
            gray200: string;
            gray300: string;
            gray400: string;
            gray500: string;
            gray600: string;
            gray700: string;
            gray800: string;
            gray900: string;
            gray1000: string;
            gray1100: string;
            gray1200: string;
            gray1300: string;
            gray1400: string;
            gray1500: string;
            gray1600: string;

            sub100: string;

            main100: string;
            main200: string;
            main300: string;

            white: string;
        };
        typography: {
            headlineL: {
                fontSize: string,
                fontWeight: number,
                lineHeight: string,
            },
            headlineM: {
                fontSize: string,
                fontWeight: number,
                lineHeight: string,
            },
            headlineS: {
                fontSize: string,
                fontWeight: number,
                lineHeight: string,
            },
            titleL: {
                fontSize: string,
                fontWeight: number,
                lineHeight: string,
            },
            titleM: {
                fontSize: string,
                fontWeight: number,
                lineHeight: string,
            },
            titleS: {
                fontSize: string,
                fontWeight: number,
                lineHeight: string,
            },
            bodyEL: {
                fontSize: string,
                fontWeight: number,
                lineHeight: string,
            },
            bodyL: {
                fontSize: string,
                fontWeight: number,
                lineHeight: string,
            },
            bodyM: {
                fontSize: string,
                fontWeight: number,
                lineHeight: string,
            },
            bodyS: {
                fontSize: string,
                fontWeight: number,
                lineHeight: string,
            },
            buttonEL: {
                fontSize: string,
                fontWeight: number,
                lineHeight: string,
            },
            buttonL: {
                fontSize: string,
                fontWeight: number,
                lineHeight: string,
            },
            buttonM: {
                fontSize: string,
                fontWeight: number,
                lineHeight: string,
            },
            captionL: {
                fontSize: string,
                fontWeight: number,
                lineHeight: string,
            },
            captionM: {
                fontSize: string,
                fontWeight: number,
                lineHeight: string,
            },
            popupTitleL: {
                fontSize: string,
                fontWeight: number,
                lineHeight: string,
            },


        };
        shadows: {
            shadow100: string;
            shadow200: string;
            shadow300: string;
            // ...
        };
    }
}
