import { ColumnDef } from '@tanstack/react-table';

export type CategoryColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Label',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
];
