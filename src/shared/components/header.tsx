import { Button } from '@/shared/ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export function Header() {
	const { theme, setTheme } = useTheme();

	const onThemeToggle = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	return (
		<header className='sticky top-0 z-40 w-full border-b bg-background flex h-16 items-center justify-between p-4'>
			<div className='flex items-center gap-6'>
				<h1 className='text-xl font-bold text-primary'>Product Explorer</h1>
			</div>

			<div className='flex items-center gap-2 text-primary'>
				<Button variant='ghost' size='icon' onClick={onThemeToggle}>
					{theme === 'dark' ? <SunIcon className='h-5 w-5' /> : <MoonIcon className='h-5 w-5' />}
				</Button>
			</div>
		</header>
	);
}
