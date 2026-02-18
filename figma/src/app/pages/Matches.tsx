import { Heart, MapPin, DollarSign } from "lucide-react";
import { BottomNavbar } from "../components/BottomNavbar";
import { mockJobs } from "../data/mockJobs";

export function Matches() {
  // Get some mock matched jobs (first 5 jobs as example)
  const matchedJobs = mockJobs.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 pb-24">
      <BottomNavbar />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Your Matches
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Companies that liked you back
          </p>
        </div>

        <div className="grid gap-6">
          {matchedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all"
            >
              <div className={`h-2 bg-gradient-to-r ${job.color}`}></div>
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  {job.logoImage ? (
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-2">
                      <img
                        src={job.logoImage}
                        alt={job.company}
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                  ) : (
                    <div className="text-4xl">{job.logo}</div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 font-semibold">
                      {job.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-pink-100 dark:bg-pink-900/30 rounded-full">
                    <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                    <span className="text-pink-700 dark:text-pink-300 font-bold text-sm">
                      {job.compatibilityScore}%
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="flex items-center gap-1 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                    {job.type}
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                    <DollarSign className="w-4 h-4" />
                    {job.salary}
                  </span>
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:shadow-lg active:scale-95 transition-all">
                  Message Company
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}