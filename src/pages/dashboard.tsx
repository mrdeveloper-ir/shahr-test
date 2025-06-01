import { Tabs, TabsList, TabsTrigger } from '@/ui/tabs';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

export function Dashboard() {
	const location = useLocation();
	const navigate = useNavigate();

	const currentTab = location.pathname === '/' ? 'products' : 'users';

	const handleTabChange = (value: string) => {
		if (value === 'products') {
			navigate('/');
		} else if (value === 'users') {
			navigate('/users');
		}
	};

	return (
		<div className='container'>
			<Tabs value={currentTab} onValueChange={handleTabChange} className=''>
				<TabsList>
					<TabsTrigger value='products'>Products</TabsTrigger>
					<TabsTrigger value='users'>Users</TabsTrigger>
				</TabsList>
			</Tabs>

			<Routes>
				<Route path='/' element={<div>Products Page</div>} />
				<Route path='/users' element={<div>Users Page</div>} />
			</Routes>
		</div>
	);
}
