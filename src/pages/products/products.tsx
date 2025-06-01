import { useSearch } from '@/shared/hooks/useSearch';
import { Product } from '@/shared/types';
import { Input } from '@/shared/ui/input';
import { useGetProductsQuery } from '@/store/api';
import { SearchIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { DataTable } from './components/dataTable';

export function Products() {
	const [page, setPage] = useState(1);
	const limit = 10;
	const { data: products, isLoading, isFetching } = useGetProductsQuery({ limit: page * limit });
	const prevDataLength = useRef(0);
	const { ref, inView } = useInView();

	useEffect(() => {
		if (inView && !isFetching && products?.length && products.length > prevDataLength.current) {
			prevDataLength.current = products.length;
			setPage(prev => prev + 1);
		}
	}, [inView, isFetching, products]);

	const { searchTerm, setSearchTerm, filteredItems } = useSearch<Product>(
		products,
		product => `${product.title} ${product.category} ${product.description}`,
	);

	return (
		<div className='space-y-4'>
			<div className='relative w-full md:w-90'>
				<SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
				<Input placeholder='Search products...' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className='pl-8' />
			</div>

			<DataTable isFetching={isFetching} isLoading={isLoading} ref={ref} filteredItems={filteredItems} />
		</div>
	);
}
