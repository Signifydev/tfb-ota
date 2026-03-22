import Link from "next/link";

export default function OperationsDashboard() {
  return (
    <div className="p-10 space-y-6">
      <h1 className="text-2xl font-bold">
        Operations Dashboard
      </h1>

      <div className="flex gap-4">
        <Link
          href="/operations/add-listing"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Listing
        </Link>

        <Link
          href="/operations/listings"
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Manage Listings
        </Link>
      </div>
    </div>
  );
}