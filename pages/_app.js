import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
if(module.hot){
  module.hot.accept()
}
export default MyApp
