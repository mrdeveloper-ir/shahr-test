import { useAppSelector } from '@/shared/hooks/reduxHelper';
import { Product } from '@/shared/types';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardFooter } from '@/shared/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { addToCart, removeFromCart } from '@/store/reducers/cart';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { useDispatch } from 'react-redux';

export function DataTable({
	isLoading,
	filteredItems,
	isFetching,
	ref,
}: {
	isLoading: boolean;
	filteredItems?: Product[];
	isFetching: boolean;
	ref: (node?: Element | null) => void;
}) {
	const cartItems = useAppSelector(state => state.cart.cartItems);

	const dispatch = useDispatch();
	const handleSelectProduct = (product: Product) => {
		dispatch(addToCart(product));
	};
	const handleRemoveProduct = (id: number) => {
		dispatch(removeFromCart(id));
	};

	return (
		<>
			{/* Desktop Table View */}
			<div className='hidden md:block'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Image</TableHead>
							<TableHead>Title</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className='text-primary'>
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={5} className='h-24 text-center'>
									Loading...
								</TableCell>
							</TableRow>
						) : filteredItems?.length === 0 ? (
							<TableRow>
								<TableCell colSpan={5} className='h-24 text-center'>
									No products found.
								</TableCell>
							</TableRow>
						) : (
							filteredItems?.map(product => (
								<TableRow key={product.id}>
									<TableCell>
										<img src={product.image} alt={product.title} className='h-12 w-12 object-contain' />
									</TableCell>
									<TableCell>
										<div className='font-medium w-50 truncate' title={product.title}>
											{product.title}
										</div>
									</TableCell>
									<TableCell>{product.category}</TableCell>
									<TableCell>${product.price.toFixed(2)}</TableCell>
									<TableCell>
										{cartItems.find(item => item.id === product.id) ? (
											<Button
												size='sm'
												onClick={() => handleRemoveProduct(product.id)}
												variant='outline'
												className='cursor-pointer'
											>
												<Trash2Icon className='mr-1 h-4 w-4' />
												Remove
											</Button>
										) : (
											<Button
												size='sm'
												onClick={() => handleSelectProduct(product)}
												variant='outline'
												className='cursor-pointer'
											>
												<PlusIcon className='mr-1 h-4 w-4' />
												Add
											</Button>
										)}
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{/* Mobile Card View */}
			<div className='grid gap-4 sm:grid-cols-2 md:hidden'>
				{isLoading ? (
					<div className='text-center py-4'>Loading...</div>
				) : filteredItems?.length === 0 ? (
					<div className='text-center py-4'>No products found.</div>
				) : (
					filteredItems?.map(product => (
						<Card key={product.id}>
							<CardContent className='p-4'>
								<div className='flex items-center space-x-4'>
									<img src={product.image} alt={product.title} className='h-16 w-16 object-contain' />
									<div className='flex-1'>
										<h3 className='font-medium line-clamp-1'>{product.title}</h3>
										<p className='text-sm text-muted-foreground'>{product.category}</p>
										<p className='font-medium'>${product.price.toFixed(2)}</p>
									</div>
								</div>
							</CardContent>
							<CardFooter className='p-4 pt-0'>
								<Button
									size='sm'
									onClick={() => handleSelectProduct(product)}
									variant='outline'
									className='w-full cursor-pointer'
								>
									<PlusIcon className='mr-1 h-4 w-4' />
									Add to Selected
								</Button>
							</CardFooter>
						</Card>
					))
				)}
			</div>

			{/* Infinite scroll trigger */}
			{!isLoading && filteredItems && filteredItems.length > 0 && (
				<div ref={ref} className='py-4 text-center text-sm text-muted-foreground'>
					{isFetching ? 'Loading more...' : ''}
				</div>
			)}
		</>
	);
}
