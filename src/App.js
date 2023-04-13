import React from 'react'

import './scss/app.scss'

import { Routes, Route } from 'react-router-dom'

import Header from './components/Header.jsx'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'

export const SearchValue = React.createContext('')

function App() {
	const [searchInput, setSearchInput] = React.useState('')
	return (
		<div className='wrapper'>
			<SearchValue.Provider value={{ searchInput, setSearchInput }}>
				<Header />
				<div className='content'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</div>
			</SearchValue.Provider>
		</div>
	)
}

export default App
