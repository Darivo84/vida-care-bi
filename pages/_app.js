import App from 'next/app';
import Head from 'next/head';
import React from 'react';

import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import graphqlClient from '../api/graphqlClient';
import store from '../store';

import theme from '../lib/theme';
import DashboardLayout from '../components/layouts/DashboardLayout';

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, router } = this.props;
    let title = '';
    let chosenTab = '';
    let sidebar = false;
    if (router.pathname.startsWith('/dashboard/unassigned-calls-chart')) {
      title = 'Unassigned Calls';
      chosenTab = 'unassigned';
      sidebar = true;
    } else if (router.pathname.startsWith('/dashboard/visits-not-checked-in')) {
      title = 'Visits Not Checked In';
      chosenTab = 'notChecked';
      sidebar = true;
    } else if (router.pathname.startsWith('/dashboard/late-calls')) {
      title = 'Late Calls';
      chosenTab = 'late';
      sidebar = true;
    } else if (router.pathname.startsWith('/dashboard/missed-calls')) {
      title = 'Missed Calls and Incidents Reported';
      chosenTab = 'missedCalls';
      sidebar = true;
    } else if (router.pathname.startsWith('/dashboard/missing-notes')) {
      title = 'Missing Notes';
      chosenTab = 'missingNotes';
      sidebar = true;
    } else {
      title = 'Overview';
      chosenTab = 'overview';
      sidebar = false;
    }


    if (router.pathname.startsWith('/dashboard')) {
      return (
        <Provider store={store}>
          <Head>
            <title>Vida Technology</title>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />

            <link rel="stylesheet" type="text/css" href="/nprogress.css" />
            <link href="/styles.css" rel="stylesheet" />
          </Head>
          <ApolloProvider client={graphqlClient}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <DashboardLayout
                title={title}
                chosenTab={chosenTab}
                sidebar={sidebar}
          
              >
                <Component {...pageProps} />
              </DashboardLayout>
            </ThemeProvider>
          </ApolloProvider>
        </Provider>
      );
    }
    return (
      <Provider store={store}>
        <Head>
          <title>Vida Technology</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />

          <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        </Head>
        <ApolloProvider client={graphqlClient}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </Provider>
    );
  }
}
