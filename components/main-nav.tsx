'use client';

import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { cn } from '@/lib/utils';

export default function MainNav() {
  const pathName = usePathname();
  const paramsValue = useParams();
  const params = paramsValue.param;
  const { user } = useUser();

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

  // const canAccessAdmin = user?.publicMetadata?.accessible_paths?.includes('/admin');
  // const canAccessAdmin = Array.isArray(user?.publicMetadata?.accessible_paths)
  //   && user.publicMetadata.accessible_paths.includes('/admin');
  const canAccessAdmin =
    user &&
    typeof user.publicMetadata === 'object' &&
    Array.isArray(user.publicMetadata.accessible_paths) &&
    user.publicMetadata.accessible_paths.includes('/admin');

  return (
    <nav className='flex items-center space-x-4 lg:space-x-6'>
      {routes.map((route) => {
        if (route.href === '/admin' && !canAccessAdmin) {
          return null;
        }

        return (
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
        );
      })}
      {/* <AdminMenu /> */}
    </nav>
  );
}
