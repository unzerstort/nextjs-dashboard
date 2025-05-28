import { fetchCustomers, fetchFilteredCustomers } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import CustomersTable from '@/app/ui/customers/table';
import Search from '@/app/ui/search';
import { Metadata } from 'next';
import Pagination from '@/app/ui/invoices/pagination';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';

export const metadata: Metadata = {
  title: 'Customers Page',
};

export default async function Page(props: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const customers = await fetchFilteredCustomers(query);
  const totalPages = await fetchCustomers(query);

  return (
    <div className="w-full">

      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <CustomersTable customers={customers} />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
