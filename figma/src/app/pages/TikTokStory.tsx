import { useState } from "react";
import { motion, PanInfo } from "motion/react";
import { mockJobs } from "../data/mockJobs";
import {
  Bookmark,
  MapPin,
  Briefcase,
  Calendar,
  MapPinned,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { BottomNavbar } from "../components/BottomNavbar";

// Story circles data - could be job categories, companies, or featured jobs
const storyCircles = [
  {
    id: "tech",
    label: "Tech",
    image: "https://images.unsplash.com/photo-1544847558-3ccacb31ee7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwbGFwdG9wJTIwY29kaW5nfGVufDF8fHx8MTc3MTI1MTY5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "finance",
    label: "Finance",
    image: "https://images.unsplash.com/photo-1675580167286-47ea50993b8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwbW9uZXklMjBidXNpbmVzc3xlbnwxfHx8fDE3NzEyODY5NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gradient: "from-green-500 to-teal-500",
  },
  {
    id: "design",
    label: "Design",
    image: "https://images.unsplash.com/photo-1624901344246-8759f305fef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBjcmVhdGl2ZSUyMGFydHxlbnwxfHx8fDE3NzEyMDY1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "marketing",
    label: "Marketing",
    image: "https://images.unsplash.com/photo-1566514883564-c4cdfa535113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBhbmFseXRpY3MlMjBidXNpbmVzc3xlbnwxfHx8fDE3NzEyODY5NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "sales",
    label: "Sales",
    image: "https://images.unsplash.com/photo-1748361920780-2a77fdc2cd32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxlcyUyMGhhbmRzaGFrZSUyMGJ1c2luZXNzfGVufDF8fHx8MTc3MTIxNzYwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    id: "healthcare",
    label: "Health",
    image: "https://images.unsplash.com/photo-1769147555720-71fc71bfc216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMGhvc3BpdGFsfGVufDF8fHx8MTc3MTE4NjU4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gradient: "from-pink-500 to-rose-500",
  },
];

export function TikTokStory() {
  const { theme } = useTheme();
  const [jobs] = useState(mockJobs);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedStory, setSelectedStory] = useState<
    string | null
  >(null);
  const [savedJobs, setSavedJobs] = useState<string[]>(() => {
    const saved = localStorage.getItem("savedJobs");
    return saved ? JSON.parse(saved) : [];
  });
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    setIsDragging(false);
    const swipeThreshold = 100;
    const offset = info.offset.y;

    if (
      offset < -swipeThreshold &&
      currentIndex < jobs.length - 1
    ) {
      // Swipe up - next job
      setCurrentIndex(currentIndex + 1);
    } else if (offset > swipeThreshold && currentIndex > 0) {
      // Swipe down - previous job
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSave = () => {
    const jobId = jobs[currentIndex].id;
    const isSaved = savedJobs.includes(jobId);

    let newSavedJobs;
    if (isSaved) {
      newSavedJobs = savedJobs.filter((id) => id !== jobId);
    } else {
      newSavedJobs = [...savedJobs, jobId];
    }

    setSavedJobs(newSavedJobs);
    localStorage.setItem(
      "savedJobs",
      JSON.stringify(newSavedJobs),
    );
  };

  const handleApply = () => {
    alert(
      `Applying to ${jobs[currentIndex].title} at ${jobs[currentIndex].company}`,
    );

    if (currentIndex < jobs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div
      className={`relative w-full h-[calc(100vh-5rem)] overflow-hidden ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <BottomNavbar />

      {/* Story circles row at the top */}
      <div
        className={`absolute top-0 left-0 right-0 z-10 ${
          theme === "dark" ? "bg-gray-900/95" : "bg-white/95"
        } backdrop-blur-md border-b ${
          theme === "dark"
            ? "border-gray-800"
            : "border-gray-200"
        } px-4 py-2.5`}
      >
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {storyCircles.map((story) => (
            <button
              key={story.id}
              onClick={() => setSelectedStory(story.id)}
              className="flex flex-col items-center gap-1 flex-shrink-0"
            >
              <div
                className={`w-14 h-14 rounded-full bg-gradient-to-br ${story.gradient} p-[3px] ${
                  selectedStory === story.id
                    ? "ring-4 ring-purple-500"
                    : ""
                }`}
              >
                <img
                  src={story.image}
                  alt={story.label}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <span
                className={`text-[10px] font-medium ${
                  theme === "dark"
                    ? "text-gray-300"
                    : "text-gray-700"
                }`}
              >
                {story.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Job cards container with vertical scroll */}
      <div className="absolute inset-0 pt-24 overflow-hidden px-4">
        <div className="relative w-full h-full">
          {jobs.map((job, index) => {
            const isSaved = savedJobs.includes(job.id);
            const isActive = index === currentIndex;

            return (
              <motion.div
                key={job.id}
                className="absolute inset-0 w-full flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 0.9,
                  y: isActive
                    ? 0
                    : index > currentIndex
                      ? 50
                      : -50,
                  pointerEvents: isActive ? "auto" : "none",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                drag={isActive ? "y" : false}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.2}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                {/* Job Card */}
                <div
                  className={`relative w-full h-[80vh] max-h-[625px] rounded-3xl overflow-hidden shadow-2xl ${
                    theme === "dark"
                      ? "bg-gray-800"
                      : "bg-white"
                  }`}
                >
                  {/* Card background with image and overlays */}
                  <div className="absolute inset-0">
                    {/* Background image */}
                    {job.bgImage && (
                      <div className="absolute inset-0">
                        <img
                          src={job.bgImage}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Gradient overlay with job color */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${job.color} opacity-85`}
                    ></div>

                    {/* White spotlight for readability */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.25) 30%, transparent 60%)",
                      }}
                    ></div>

                    {/* Dark overlay for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
                  </div>

                  {/* Card content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    {/* Top section - Company and job title */}
                    <div>
                      {/* Company info */}
                      <div className="flex items-center gap-3 mb-5">
                        {job.logoImage ? (
                          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-2 shadow-xl">
                            <img
                              src={job.logoImage}
                              alt={job.company}
                              className="w-12 h-12 object-contain"
                            />
                          </div>
                        ) : (
                          <div className="text-4xl">
                            {job.logo}
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-lg">
                            {job.company}
                          </h3>
                        </div>
                        {/* Match meter */}
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-2 rounded-full border border-white/30">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                          <span className="text-white font-bold text-sm">
                            {job.compatibilityScore}% Match
                          </span>
                        </div>
                      </div>

                      {/* Job title */}
                      <h2 className="text-white text-3xl md:text-4xl font-black mb-2 leading-tight drop-shadow-lg">
                        {job.title}
                      </h2>

                      {/* Salary */}
                      <div className="mb-3">
                        <p className="text-white text-xl font-bold drop-shadow-md">
                          {job.salary}
                        </p>
                      </div>

                      {/* Job details - location and type */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1.5 bg-white/25 backdrop-blur-md rounded-full text-white text-sm font-semibold flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />{" "}
                          {job.location}
                        </span>
                        <span className="px-3 py-1.5 bg-white/25 backdrop-blur-md rounded-full text-white text-sm font-semibold">
                          {job.type}
                        </span>
                      </div>
                    </div>

                    {/* Bottom section */}
                    <div className="max-w-lg">
                      {/* Description */}
                      <p className="text-white text-sm leading-relaxed mb-3 drop-shadow-md line-clamp-3">
                        {job.description}
                      </p>

                      {/* Job Info Block */}
                      <div className="grid grid-cols-3 gap-2 mb-3 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                        <div className="flex flex-col items-center text-center">
                          <Briefcase className="w-4 h-4 text-white mb-1" />
                          <p className="text-white/70 text-[10px] font-medium mb-0.5">
                            Experience
                          </p>
                          <p className="text-white text-xs font-bold">
                            {job.experience}
                          </p>
                        </div>
                        <div className="flex flex-col items-center text-center border-l border-r border-white/20">
                          <Calendar className="w-4 h-4 text-white mb-1" />
                          <p className="text-white/70 text-[10px] font-medium mb-0.5">
                            Schedule
                          </p>
                          <p className="text-white text-xs font-bold">
                            {job.schedule}
                          </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <MapPinned className="w-4 h-4 text-white mb-1" />
                          <p className="text-white/70 text-[10px] font-medium mb-0.5">
                            Work Type
                          </p>
                          <p className="text-white text-xs font-bold">
                            {job.workType}
                          </p>
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {job.benefits
                          .slice(0, 3)
                          .map((benefit, benefitIndex) => (
                            <span
                              key={benefitIndex}
                              className="text-xs text-white/90 bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full font-medium"
                            >
                              {benefit}
                            </span>
                          ))}
                      </div>

                      {/* Action buttons */}
                      {index === currentIndex && (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={handleSave}
                            className={`flex-shrink-0 w-12 h-12 rounded-full ${
                              isSaved
                                ? "bg-yellow-500"
                                : "bg-white/20 backdrop-blur-md border-2 border-white/30"
                            } shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all`}
                          >
                            <Bookmark
                              className="w-5 h-5 text-white"
                              fill={isSaved ? "white" : "none"}
                            />
                          </button>

                          <button
                            onClick={handleApply}
                            className="flex-1 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-100 active:scale-95 transition-all shadow-xl"
                          >
                            Apply Now
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}