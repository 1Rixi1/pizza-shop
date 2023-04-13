import React from 'react'
import ReactDOM from 'react-dom/client' // преобразует логику react в html код
import App from './App'
import { BrowserRouter } from 'react-router-dom'

//redux
import { Provider } from 'react-redux'
import store from './redux/store'
//создает точку запуска приложения
const root = ReactDOM.createRoot(document.getElementById('root'))

// точка запуска - отрендери(отобрази) нам html который ты возьмешь из <React.StrictMode> <App /> </React.StrictMode>

root.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
)
