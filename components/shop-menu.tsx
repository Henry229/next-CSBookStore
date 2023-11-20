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

type ShopMenuItem = {
  label: string;
  route: string;
};

const shopMenuItems: ShopMenuItem[] = [
  { label: 'Books', route: '/books' },
  { label: 'Test Papers', route: '/testPaper' },
  { label: 'AudioBooks', route: '/audioBooks' },
];

export default function ShopMenu() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleItemClick = (route: string) => {
    router.push(route);
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            open ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          Shop now
        </MenubarTrigger>
        <MenubarContent>
          {shopMenuItems.map((item) => (
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
