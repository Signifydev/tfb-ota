import { getActivities } from "@/services/listings";
import Link from "next/link";

export default async function ActivitiesPage() {
  const activities = await getActivities();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Adventure Activities in Rishikesh
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activities.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold">
                {item.title}
              </h2>

              <p className="text-gray-500 text-sm">
                {item.location}
              </p>

              <p className="text-lg font-bold mt-2">
                ₹{item.selling_price}
              </p>

              <Link
                href={`/activities/${item.slug}`}
                className="block mt-3 bg-black text-white text-center py-2 rounded"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}