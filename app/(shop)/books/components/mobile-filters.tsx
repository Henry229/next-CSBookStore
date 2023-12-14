'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';

import IconButton from '@/components/ui/icon-button';
import MobileButton from '@/components/ui/mobile-button';
import { Item, Subject } from '@/types';

import Filter from './filter';

interface MobileFiltersProps {
  items: Item[];
  subjects: Subject[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ items, subjects }) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <MobileButton
        onClick={onOpen}
        className='flex items-center gap-x-2 lg:hidden'
      >
        Filters
        <Plus size={20} />
      </MobileButton>

      <Dialog
        open={open}
        as='div'
        className='relative z-40 lg:hidden'
        onClose={onClose}
      >
        {/* Background color and opacity */}
        <div className='fixed inset-0 bg-black bg-opacity-25' />

        {/* Dialog position */}
        <div className='fixed inset-0 z-40 flex'>
          <Dialog.Panel className='relative flex flex-col w-full h-full max-w-xs py-4 pb-6 ml-auto overflow-y-auto bg-white shadow-xl'>
            {/* Close button */}
            <div className='flex items-center justify-end px-4'>
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>

            <div className='p-4'>
              <Filter valueKey='itemId' name='Itmes' data={items} />
              <Filter valueKey='subjectId' name='Subjects' data={subjects} />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilters;
