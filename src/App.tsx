import { ThemeProvider } from 'next-themes';
import { Dashboard } from './pages/dashboard/dashboard';
import { Header } from './shared/components/header';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

function App() {
	return (
		<Provider store={store}>
			<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
				<Router>
					<div className='min-h-screen bg-background'>
						<Header />
						<main className='flex justify-center p-4'>
							<Routes>
								<Route path='*' element={<Dashboard />} />
							</Routes>
						</main>
					</div>
				</Router>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
