import { ThemeProvider } from 'styled-components';

const theme = {
  //Colors
  purple500: '#6D4DEB',
  // purple: '#6D4DEB',

  purple400: '#8A71EF',
  purple300: '#A794F3',

  lavender200: '#E1DDF1',
  lavender300: '#A5D3E5',
  lavender400: '#87C5DC',
  lavender500: '#B4ABDC',

  grey600: '#DBDBDB',
  grey400: '#E8E8E8',
  grey300: '#EDEDED',
  grey200: '#F3F3F3',
  grey100: '#F8F8F8',

  white: '#F8F8F8',
  black50: '#A0A0A0',

  black200: '#505050',
  black900: '#1C1C1C',
  black500: '#2E2E2E',
  azure200: '#C3E2ED',
  azure300: '#A5D3E5',
  azure400: '#87C5DC',
  azure500: '#69B6D3',


  yellow500: '#EBBA00',
  yellow400: '##FFD123',
  yellow300: '#FFDD5A',
  yellow200: '#FFE891',

  orange500: '#EC8300',
  orange400: '#FFCE91',
  orange300: '#FF9D24',
  orange200: '#FFCE91',

  //Shadows
  smallShadow:
    '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
  mdShadow:
    '0px 4px 16px -2px rgba(16, 24, 40, 0.05), 0px 2px 3px -2px rgba(16, 24, 40, 0.04)',
  lgShadow:
    '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
  xlShadow:
    '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
  xl2Shadow: '0px 24px 48px -12px rgba(16, 24, 40, 0.18)',
  xl3Shadow: '0px 32px 64px -12px rgba(16, 24, 40, 0.14)',
};

// const Theme = ({ children }) => (
//   <ThemeProvider theme={theme}>{children}</ThemeProvider>
// );

export default theme;
