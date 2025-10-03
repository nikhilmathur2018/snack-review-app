import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { Session } from "next-auth";
import connectDB from "@/lib/mongoose";
import Customer from "@/models/Customer";
import Layout from "@/components/Layout";

export default function ViewCustomers({ customers }: { customers: any[] }) {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">
          View Customer Reviews
        </h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Review
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-snack-primary">
                    {customer.rating}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {customer.review}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {customers.length === 0 && (
            <p className="text-center py-8 text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const session: Session | null = await getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!session) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  await connectDB();
  const customers = await Customer.find({}).sort({ createdAt: -1 }).lean();

  return { props: { customers: JSON.parse(JSON.stringify(customers)) } };
}
