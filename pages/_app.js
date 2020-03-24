import CssBaseLine from '@material-ui/core/CssBaseline'
import { Fragment } from 'react'

function MyApp({ Component, pageProps }) {
  return <Fragment>
    <CssBaseLine />
    <Component {...pageProps} />
  </Fragment>
}

export default MyApp
