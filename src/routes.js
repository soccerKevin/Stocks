import * as pages from './pages'

const routes = [
  {
    Page: pages.Home,
    routeOptions: {
      path:  ['/', ''],
      exact: true,
    }
  },
  {
    Page: pages.Charts,
    routeOptions: {
      path:  '/mycharts',
      exact: true,
    },
    pageOptions: {

    },
  },
]

export default routes