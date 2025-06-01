import { useAppSelector } from '@/shared/hooks/redux-helper';
import { Badge } from '@/shared/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Products } from '../products/products';

export function Dashboard() {
	const location = useLocation();
	const navigate = useNavigate();
	const cartItems = useAppSelector(state => state.cart.cartItems);

	const currentTab = location.pathname === '/' ? 'products' : location.pathname === '/users' ? 'users' : 'cart';

	const handleTabChange = (value: string) => {
		if (value === 'products') {
			navigate('/');
		} else if (value === 'users') {
			navigate('/users');
		}
	};

	return (
		<div className='container'>
			<Tabs value={currentTab} onValueChange={handleTabChange} className='mb-4'>
				<TabsList>
					<TabsTrigger value='products'>Products</TabsTrigger>
					<TabsTrigger value='users'>Users</TabsTrigger>
					<TabsTrigger value='cart'>
						cart
						<Badge variant='default'>{cartItems.length}</Badge>
					</TabsTrigger>
				</TabsList>
			</Tabs>

			<Routes>
				<Route path='/' element={<Products />} />
				<Route path='/users' element={<div>Users Page</div>} />
			</Routes>
		</div>
	);
}
