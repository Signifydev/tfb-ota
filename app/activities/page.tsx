import { getActivities } from "@/services/listings";
import Link from "next/link";

export default async function ActivitiesPage() {
  const activities = await getActivities();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Adventure Activities
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activities.map((item) => {
  console.log("ITEM:", item);

  if (!item.slug) return null;

  return (
    <Link href={`/activities/${item.slug}`}>
      View Details
    </Link>
  );
})}
      </div>
    </div>
  );
}