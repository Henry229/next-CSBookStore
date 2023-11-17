'use client';

import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function MainNav() {
  const pathName = usePathname();
  const paramsValue = useParams();
  const params = paramsValue.param;

  const routes = [
    {
      href: `/`,
      label: 'Shop Now',
      active: pathName === `/`,
    },
    {
      href: `/${params}/Contact`,
      label: 'Contact',
      active: pathName === `/contact`,
    },
    {
      href: `/admin`,
      label: 'Admin',
      active: pathName === `/admin`,
    },
  ];

  return (
    <nav className='flex items-center space-x-4 lg:space-x-6'>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active
              ? 'text-black dark:text-white'
              : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
