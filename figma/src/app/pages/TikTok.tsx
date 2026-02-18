import { useState } from "react";
import { motion, useMotionValue, PanInfo } from "motion/react";
import { mockJobs } from "../data/mockJobs";
import { Bookmark, MapPin, Briefcase, Calendar, MapPinned } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useTheme } from "../context/ThemeContext";
import { BottomNavbar } from "../components/BottomNavbar";

export function TikTok() {
  const { theme } = useTheme();
  const [jobs] = useState(mockJobs);
  const [currentIndex, setCurrentIndex] = useState(0);
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
      // Remove from saved
      newSavedJobs = savedJobs.filter(id => id !== jobId);
    } else {
      // Add to saved
      newSavedJobs = [...savedJobs, jobId];
    }
    
    setSavedJobs(newSavedJobs);
    localStorage.setItem("savedJobs", JSON.stringify(newSavedJobs));
  };

  const handleApply = () => {
    // In a real app, this would navigate to application page or open a modal
    alert(`Applying to ${jobs[currentIndex].title} at ${jobs[currentIndex].company}`);
    
    // Move to next job after applying
    if (currentIndex < jobs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] overflow-hidden bg-black">
      <BottomNavbar />
      
      <motion.div
        animate={
          !isDragging
            ? { y: -currentIndex * (window.innerHeight - 80) }
            : undefined
        }
        drag="y"
        dragConstraints={{
          top: -((jobs.length - 1) * (window.innerHeight - 80)),
          bottom: 0,
        }}
        dragElastic={0.1}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className="absolute inset-0"
      >
        {jobs.map((job, index) => {
          const isSaved = savedJobs.includes(job.id);

          return (
            <div
              key={job.id}
              className="absolute inset-0 w-full h-full"
              style={{ top: `${index * (window.innerHeight - 80)}px` }}
            >
              {/* Full screen job card - layered backgrounds like BoldImage variant */}
              <div className="absolute inset-0">
                {/* Background image layer */}
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

                {/* White spotlight in center for better readability */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(circle at 50% 25%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.25) 30%, transparent 60%)'
                  }}
                ></div>

                {/* Dark overlay for contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 pt-6 pb-6">
                {/* Top section - Company first, then job title */}
                <div>
                  {/* Company info at top */}
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
                      <div className="text-4xl">{job.logo}</div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg">
                        {job.company}
                      </h3>
                    </div>
                    {/* Match meter */}
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-2 rounded-full border border-white/30">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      <span className="text-white font-bold text-sm">{job.compatibilityScore}% Match</span>
                    </div>
                  </div>

                  {/* Job title - hero content below company */}
                  <h2 className="text-white text-4xl md:text-5xl font-black mb-1 leading-tight drop-shadow-lg">
                    {job.title}
                  </h2>

                  {/* Salary - prominent display */}
                  <div className="mb-3">
                    <p className="text-white text-2xl font-bold drop-shadow-md">
                      {job.salary}
                    </p>
                  </div>

                  {/* Job details - location and type */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-4 py-2 bg-white/25 backdrop-blur-md rounded-full text-white text-sm font-semibold flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" /> {job.location}
                    </span>
                    <span className="px-4 py-2 bg-white/25 backdrop-blur-md rounded-full text-white text-sm font-semibold">
                      {job.type}
                    </span>
                  </div>
                </div>

                {/* Bottom section - Description, Job Info Block, Benefits, and Action Buttons */}
                <div className="max-w-lg">
                  <p className="text-white text-sm leading-relaxed mb-4 drop-shadow-md">
                    {job.description}
                  </p>

                  {/* Job Info Block - Experience, Schedule, Work Type */}
                  <div className="grid grid-cols-3 gap-3 mb-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                    {/* Experience */}
                    <div className="flex flex-col items-center text-center">
                      <Briefcase className="w-5 h-5 text-white mb-1.5" />
                      <p className="text-white/70 text-xs font-medium mb-0.5">Experience</p>
                      <p className="text-white text-xs font-bold">{job.experience}</p>
                    </div>
                    {/* Schedule */}
                    <div className="flex flex-col items-center text-center border-l border-r border-white/20">
                      <Calendar className="w-5 h-5 text-white mb-1.5" />
                      <p className="text-white/70 text-xs font-medium mb-0.5">Schedule</p>
                      <p className="text-white text-xs font-bold">{job.schedule}</p>
                    </div>
                    {/* Work Type */}
                    <div className="flex flex-col items-center text-center">
                      <MapPinned className="w-5 h-5 text-white mb-1.5" />
                      <p className="text-white/70 text-xs font-medium mb-0.5">Work Type</p>
                      <p className="text-white text-xs font-bold">{job.workType}</p>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="flex flex-wrap gap-2 mb-4">{job.benefits
                      .slice(0, 4)
                      .map((benefit, benefitIndex) => (
                        <span
                          key={benefitIndex}
                          className="text-sm text-white/90 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full font-medium"
                        >
                          {benefit}
                        </span>
                      ))}
                  </div>

                  {/* Action buttons - only show for current job */}
                  {index === currentIndex && (
                    <div className="flex items-center gap-3">
                      {/* Save for Later button */}
                      <button
                        onClick={handleSave}
                        className={`flex-shrink-0 w-14 h-14 rounded-full ${
                          isSaved
                            ? "bg-yellow-500"
                            : "bg-white/20 backdrop-blur-md border-2 border-white/30"
                        } shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all`}
                      >
                        <Bookmark
                          className="w-6 h-6 text-white"
                          fill={isSaved ? "white" : "none"}
                        />
                      </button>

                      {/* Apply Now button - primary action */}
                      <button
                        onClick={handleApply}
                        className="flex-1 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 active:scale-95 transition-all text-lg shadow-2xl"
                      >
                        Apply Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}