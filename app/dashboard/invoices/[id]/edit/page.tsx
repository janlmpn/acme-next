import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// import ResolvingMetadata from next to generate dynamic metadata
// export async function generateMetadata(
//   props: { 
//     params: Promise<{id: string}>
//   },
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const { id } = await props.params;
//   return {
//     title: `Edit Invoice ${id}`,
//   }
// }


export const metadata: Metadata = {
  title: 'Edit Invoice',
};

export default async function Page(props: { 
  params: Promise<{id: string}>
}) {
  const { id } = await props.params;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}