import React from 'react'
import ReactDOM from 'react-dom/client' // преобразует логику react в html код
import App from './App'
import { BrowserRouter } from 'react-router-dom'

//создает точку запуска приложения
const root = ReactDOM.createRoot(document.getElementById('root'))

// точка запуска - отрендери(отобрази) нам html который ты возьмешь из <React.StrictMode> <App /> </React.StrictMode>

root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
)
