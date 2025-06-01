import { useSearch } from '@/shared/hooks/useSearch';
import { User } from '@/shared/types';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardFooter } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { useGetUsersQuery } from '@/store/api';
import { SearchIcon, UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Users() {
	const { data: users, isLoading } = useGetUsersQuery();
	const navigate = useNavigate();

	const handleUserClick = (userId: number) => {
		navigate(`/users/${userId}`);
	};

	const {
		searchTerm,
		setSearchTerm,
		filteredItems: filteredUsers,
	} = useSearch<User>(users, user => `${user.name.firstname} ${user.name.lastname} ${user.email} ${user.username}`);

	return (
		<div className='space-y-4'>
			<div className='relative'>
				<SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
				<Input placeholder='Search users...' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className='pl-8' />
			</div>

			{/* Desktop Table View */}
			<div className='hidden md:block'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Username</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={4} className='h-24 text-center'>
									Loading...
								</TableCell>
							</TableRow>
						) : filteredUsers?.length === 0 ? (
							<TableRow>
								<TableCell colSpan={4} className='h-24 text-center'>
									No users found.
								</TableCell>
							</TableRow>
						) : (
							filteredUsers?.map(user => (
								<TableRow key={user.id} className='cursor-pointer' onClick={() => handleUserClick(user.id)}>
									<TableCell className='font-medium'>
										{user.name.firstname} {user.name.lastname}
									</TableCell>
									<TableCell>{user.username}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>
										<Button
											size='sm'
											variant='outline'
											onClick={e => {
												e.stopPropagation();
												handleUserClick(user.id);
											}}
										>
											View Details
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
				{isLoading ? (
					<div className='text-center py-4'>Loading...</div>
				) : filteredUsers?.length === 0 ? (
					<div className='text-center py-4'>No users found.</div>
				) : (
					filteredUsers?.map(user => (
						<Card key={user.id} className='cursor-pointer' onClick={() => handleUserClick(user.id)}>
							<CardContent className='p-4'>
								<div className='flex items-center space-x-4'>
									<div className='bg-muted rounded-full p-2'>
										<UserIcon className='h-8 w-8' />
									</div>
									<div className='flex-1'>
										<h3 className='font-medium'>
											{user.name.firstname} {user.name.lastname}
										</h3>
										<p className='text-sm text-muted-foreground'>{user.username}</p>
										<p className='text-sm text-muted-foreground'>{user.email}</p>
									</div>
								</div>
							</CardContent>
							<CardFooter className='p-4 pt-0'>
								<Button
									size='sm'
									variant='outline'
									className='w-full'
									onClick={e => {
										e.stopPropagation();
										handleUserClick(user.id);
									}}
								>
									View Details
								</Button>
							</CardFooter>
						</Card>
					))
				)}
			</div>
		</div>
	);
}
