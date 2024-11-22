// global
import './index.scss'
// view
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '@src/store'
import APP from '@src/App'
import './index'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <APP />
  </Provider>
)
