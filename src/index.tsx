import ReactDOM from 'react-dom/client' // преобразует логику react в html код
import App from './App'
import { BrowserRouter } from 'react-router-dom'

//redux
import { Provider } from 'react-redux'
import store from './redux/store'

const rootElem = document.querySelector('#root')

if (rootElem) {
	//создаем точку запуска приложения
	const root = ReactDOM.createRoot(rootElem)

	// точка запуска - отрендери(отобрази) нам html который ты возьмешь из <React.StrictMode> <App /> </React.StrictMode>

	root.render(
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	)
}
