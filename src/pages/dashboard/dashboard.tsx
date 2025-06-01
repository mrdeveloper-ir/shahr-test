import { useAppSelector } from '@/shared/hooks/reduxHelper';
import { Badge } from '@/shared/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cart } from '../cart/cart';
import { Products } from '../products/products';
import { Users } from '../users/users';

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
		} else if (value === 'cart') {
			navigate('/cart');
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

			{currentTab === 'products' && <Products />}
			{currentTab === 'users' && <Users />}
			{currentTab === 'cart' && <Cart />}
		</div>
	);
}
