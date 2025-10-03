import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import connectDB from "@/lib/mongoose";
import Customer from "@/models/Customer";
import Layout from "@/components/Layout";

export default function Dashboard({
  totalReviews,
  avgRating,
}: {
  totalReviews: number;
  avgRating: number;
}) {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900">
              Total Reviews
            </h2>
            <p className="text-3xl font-bold text-snack-primary">
              {totalReviews}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900">
              Average Rating
            </h2>
            <p className="text-3xl font-bold text-snack-primary">
              {avgRating.toFixed(1)} / 5
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  await connectDB();
  const totalReviews = await Customer.countDocuments();
  const avgRating = await Customer.aggregate([
    { $group: { _id: null, avg: { $avg: "$rating" } } },
  ]).then((res) => res[0]?.avg || 0);

  return { props: { totalReviews, avgRating } };
}
