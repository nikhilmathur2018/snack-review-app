import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { Session } from "next-auth";

export default function Home() {
  return <p>Redirecting...</p>;
}

export async function getServerSideProps(context: any) {
  const session: Session | null = await getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (session) {
    return { redirect: { destination: "/dashboard", permanent: false } };
  }
  return { redirect: { destination: "/login", permanent: false } };
}
