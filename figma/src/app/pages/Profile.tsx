import { User, Mail, MapPin, Briefcase, Edit2 } from "lucide-react";
import { BottomNavbar } from "../components/BottomNavbar";

export function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 pb-24">
      <BottomNavbar />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold">
              JS
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  John Smith
                </h1>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                  <Edit2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Software Engineer looking for new opportunities
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                  <Mail className="w-4 h-4" />
                  john.smith@email.com
                </span>
                <span className="flex items-center gap-2 px-3 py-1.5 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full text-sm font-medium">
                  <MapPin className="w-4 h-4" />
                  San Francisco, CA
                </span>
                <span className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  <Briefcase className="w-4 h-4" />
                  5 years experience
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "GraphQL", "MongoDB"].map(
              (skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>

        {/* Experience */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Experience
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Senior Software Engineer
              </h3>
              <p className="text-purple-600 dark:text-purple-400 font-semibold">
                Tech Company Inc.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                2021 - Present
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Led development of key features and mentored junior developers.
              </p>
            </div>
            <div className="border-l-4 border-pink-500 pl-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Software Engineer
              </h3>
              <p className="text-pink-600 dark:text-pink-400 font-semibold">
                Startup XYZ
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                2019 - 2021
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Built and scaled web applications from the ground up.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}