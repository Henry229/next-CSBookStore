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
import { auth, useUser } from '@clerk/nextjs';

type AdminMenuItem = {
  label: string;
  route: string;
};

interface AdminMenuProps {
  canAccessAdmin: boolean;
}

export default function AdminMenu({ canAccessAdmin }: AdminMenuProps) {
  const router = useRouter();
  const { user } = useUser();

  const adminMenuItems: AdminMenuItem[] = user
    ? [
        { label: 'Categories', route: `/${user.id}/categories` },
        { label: 'Items', route: `/${user.id}/items` },
        { label: 'Subjects', route: `/${user.id}/subjects` },
        { label: 'Settings', route: `/${user.id}/settings` },
      ]
    : [];

  const [open, setOpen] = useState(false);

  const handleItemClick = (route: string) => {
    router.push(route);
  };

  if (!canAccessAdmin) {
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
