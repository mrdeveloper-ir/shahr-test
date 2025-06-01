import { useAppSelector } from '@/shared/hooks/reduxHelper';
import { useSearch } from '@/shared/hooks/useSearch';
import { Product } from '@/shared/types';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardFooter } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { removeFromCart } from '@/store/reducers/cart';
import { SearchIcon, Trash2Icon } from 'lucide-react';
import { useDispatch } from 'react-redux';

export function Cart() {
	const selectedProducts = useAppSelector(state => state.cart.cartItems);
	const dispatch = useDispatch();

	const handleRemoveProduct = (productId: number) => {
		dispatch(removeFromCart(productId));
	};

	const {
		searchTerm,
		setSearchTerm,
		filteredItems: filteredProducts,
	} = useSearch<Product>(selectedProducts, product => `${product.title} ${product.category} ${product.description}`);

	return (
		<div className='space-y-4'>
			<div className='relative'>
				<SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
				<Input
					placeholder='Search selected products...'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className='pl-8'
				/>
			</div>

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
					<TableBody>
						{filteredProducts?.length === 0 ? (
							<TableRow>
								<TableCell colSpan={5} className='h-24 text-center'>
									No products selected.
								</TableCell>
							</TableRow>
						) : (
							filteredProducts?.map(product => (
								<TableRow key={product.id}>
									<TableCell>
										<img src={product.image} alt={product.title} className='h-12 w-12 object-contain' />
									</TableCell>
									<TableCell className='font-medium'>{product.title}</TableCell>
									<TableCell>{product.category}</TableCell>
									<TableCell>${product.price.toFixed(2)}</TableCell>
									<TableCell>
										<Button size='sm' onClick={() => handleRemoveProduct(product.id)} variant='destructive'>
											<Trash2Icon className='mr-1 h-4 w-4' />
											Remove
										</Button>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{/* Mobile Card View */}
			<div className='grid gap-4 sm:grid-cols-2 md:hidden'>
				{filteredProducts?.length === 0 ? (
					<div className='text-center py-4'>No products selected.</div>
				) : (
					filteredProducts?.map(product => (
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
								<Button size='sm' onClick={() => handleRemoveProduct(product.id)} variant='destructive' className='w-full'>
									<Trash2Icon className='mr-1 h-4 w-4' />
									Remove
								</Button>
							</CardFooter>
						</Card>
					))
				)}
			</div>
		</div>
	);
}
