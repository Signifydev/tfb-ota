import { getActivityBySlug } from "@/services/listings";

export default async function ActivityDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const activity = await getActivityBySlug(params.slug);

  if (!activity) {
    return <div className="p-6">Activity not found</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <img
        src={activity.image_url}
        className="w-full h-[400px] object-cover rounded"
      />

      <h1 className="text-3xl font-bold mt-4">
        {activity.title}
      </h1>

      <p className="text-gray-600">{activity.location}</p>

      <p className="text-xl font-semibold mt-2">
        ₹{activity.selling_price}
      </p>

      <p className="mt-4 text-gray-700">
        {activity.description}
      </p>

      <button className="mt-6 bg-black text-white px-6 py-3 rounded">
        Book Now
      </button>
    </div>
  );
}