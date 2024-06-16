'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { useAuth, useUser } from '@clerk/nextjs';

type AdminMenuItem = {
  label: string;
  route: string;
};

interface AdminMenuProps {
  accessiblerole: boolean;
}

export default function AdminMenu({ accessiblerole }: AdminMenuProps) {
  console.log('$$$$$ app > admin-menu.tsx');
  const router = useRouter();
  const user = useAuth();

  console.log('+++++user in admin menu', user?.userId, '/', accessiblerole);

  const adminMenuItems: AdminMenuItem[] = user.userId
    ? [
        { label: 'Categories', route: `/${user.userId}/categories` },
        { label: 'Items', route: `/${user.userId}/items` },
        { label: 'Subjects', route: `/${user.userId}/subjects` },
        { label: 'Products', route: `/${user.userId}/products` },
        { label: 'Orders', route: `/${user.userId}/orders` },
      ]
    : [];

  const [open, setOpen] = useState(false);

  const handleItemClick = (route: string) => {
    router.push(route);
  };

  if (!accessiblerole) {
    return null;
  }

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            open ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          Admin
        </MenubarTrigger>
        <MenubarContent>
          {adminMenuItems.map((item) => (
            <MenubarItem
              key={item.label}
              onClick={() => handleItemClick(item.route)}
            >
              {item.label}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
