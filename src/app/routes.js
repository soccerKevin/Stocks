import * as pages from 'pages'

const routes = [
  {
    Page:         pages.Home,
    routeOptions: {
      path:  ['/', ''],
      exact: true,
    },
  },
  {
    Page:         pages.Charts,
    routeOptions: {
      path:  '/mycharts',
      exact: true,
    },
  },
  {
    Page:         pages.Cryptos,
    routeOptions: {
      path:  '/cryptos',
      exact: true,
    },
  },
  {
    Page:         pages.Spread,
    routeOptions: {
      path:  ['/spread/:symbol', '/spread'],
      exact:  false,
    },
  },
]

export default routes
