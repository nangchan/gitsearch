import React from 'react';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import './App.css';
import Layout from './Layout';
import { APOLLO_CLIENT_ENDPOINT, GITHUB_AUTH_TOKEN } from './settings';

export const client = new ApolloClient({
  uri: APOLLO_CLIENT_ENDPOINT,
  headers: {
    Authorization: `Bearer ${GITHUB_AUTH_TOKEN}`,
  }
});

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
        overrides: {
          // Style sheet name ⚛️
          MuiFormHelperText: {
            // Name of the rule/variant
            contained: { // override margin of helper text
              marginLeft:0
            },
          },
          MuiFormLabel: {
            root: {
              '&.Mui-focused:not(.Mui-error)': { // override focus theme with default theme if not error
                color: 'rgba(255, 255, 255, 0.54)' // 'rgba(0, 0, 0, 0.54)',
              }
            }
          },
          MuiOutlinedInput: { // override focus border-color not error
            root: {
              '&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.23)',
                borderWidth: '1px'
              }
            },
            input: {
              '&[type=search]': {
                appearance: 'textfield', // fix for Safari rendering search fields
              }
            },
          },
          MuiSelect: {
            select: {
              '&:focus': { // override focus background on select element with default theme
                borderRadius: 4,
              }
            }
          },
          MuiList: {
            padding: {
              paddingTop:0,
              paddingBottom:0,
            }
          },
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;