import { ThemeProvider } from 'next-themes';
import { Dashboard } from './pages/dashboard';
import { Header } from './shared/components/header';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
	return (
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
	);
}

export default App;
