import './scss/app.scss'

import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'

import MainLayout from './layout/MainLayout'

import { FullPizza } from './components'

const App: React.FC = () => {
	return (
		<Routes>
			<Route path='' element={<MainLayout />}>
				<Route path='/' element={<Home />} />
				<Route path='cart' element={<Cart />} />
				<Route path='pizza/:id' element={<FullPizza />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default App
