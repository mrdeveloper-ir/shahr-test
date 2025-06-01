import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';
import { useGetUserByIdQuery } from '@/store/api';
import { ChevronLeftIcon, HomeIcon, MailIcon, PhoneIcon, UserIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export function UsersDetail() {
	const { userId } = useParams<{ userId: string }>();
	const { data: user, isLoading, isError } = useGetUserByIdQuery(Number(userId));

	if (isLoading) {
		return (
			<div className='container py-6 flex items-center justify-center min-h-[50vh]'>
				<p>Loading user details...</p>
			</div>
		);
	}

	if (isError || !user) {
		return (
			<div className='container py-6'>
				<Card>
					<CardHeader>
						<CardTitle>Error</CardTitle>
						<CardDescription>Could not load user details</CardDescription>
					</CardHeader>
					<CardFooter>
						<Button asChild>
							<Link to='/'>
								<ChevronLeftIcon className='mr-2 h-4 w-4' />
								Back to Dashboard
							</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		);
	}

	return (
		<div className='container py-6'>
			<div className='mb-6'>
				<Button asChild variant='outline'>
					<Link to='/'>
						<ChevronLeftIcon className='mr-2 h-4 w-4' />
						Back to Dashboard
					</Link>
				</Button>
			</div>

			<div className='grid gap-6 md:grid-cols-2'>
				<Card>
					<CardHeader>
						<div className='flex items-center gap-4'>
							<div className='h-16 w-16 rounded-full bg-muted flex items-center justify-center'>
								<UserIcon className='h-8 w-8' />
							</div>
							<div>
								<CardTitle>
									{user.name.firstname} {user.name.lastname}
								</CardTitle>
								<CardDescription>@{user.username}</CardDescription>
							</div>
						</div>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='flex items-center gap-2'>
							<MailIcon className='h-4 w-4 text-muted-foreground' />
							<span>{user.email}</span>
						</div>
						<div className='flex items-center gap-2'>
							<PhoneIcon className='h-4 w-4 text-muted-foreground' />
							<span>{user.phone}</span>
						</div>
						<Separator />
						<div>
							<h3 className='font-medium mb-2 flex items-center gap-2'>
								<HomeIcon className='h-4 w-4 text-muted-foreground' />
								Address
							</h3>
							<div className='space-y-1 pl-6'>
								<p>
									{user.address.number} {user.address.street}
								</p>
								<p>
									{user.address.city}, {user.address.zipcode}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Account Information</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<p className='text-sm text-muted-foreground'>Username</p>
								<p className='font-medium'>{user.username}</p>
							</div>
							<div>
								<p className='text-sm text-muted-foreground'>Email</p>
								<p className='font-medium'>{user.email}</p>
							</div>
							<div>
								<p className='text-sm text-muted-foreground'>Phone</p>
								<p className='font-medium'>{user.phone}</p>
							</div>
							<div>
								<p className='text-sm text-muted-foreground'>Location</p>
								<p className='font-medium'>{user.address.city}</p>
							</div>
						</div>
						<Separator />
						<div>
							<p className='text-sm text-muted-foreground mb-2'>Geolocation</p>
							<div className='grid grid-cols-2 gap-4'>
								<div>
									<p className='text-sm text-muted-foreground'>Latitude</p>
									<p className='font-medium'>{user.address.geolocation.lat}</p>
								</div>
								<div>
									<p className='text-sm text-muted-foreground'>Longitude</p>
									<p className='font-medium'>{user.address.geolocation.long}</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
