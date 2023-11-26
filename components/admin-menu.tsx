'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';

type AdminMenuItem = {
  label: string;
  route: string;
};

const adminMenuItems: AdminMenuItem[] = [
  { label: 'Categories', route: '/admin/categories' },
  { label: 'Items', route: '/admin/items' },
  { label: 'Subjects', route: '/admin/subjects' },
  { label: 'Settings', route: '/admin/settings' },
];

interface AdminMenuProps {
  canAccessAdmin: boolean;
}

export default function AdminMenu({ canAccessAdmin }: AdminMenuProps) {
  const router = useRouter();

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
