import { useState, useRef } from "react";
import { Calendar, Clock, MapPin, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import { HeartAnimation } from "./HeartAnimation";
import catLogo from "@/assets/cat-logo.gif";

interface ClassInfo {
  name: string;
  timing: string;
  venue: string;
  faculty: string;
}

interface DaySchedule {
  day: string;
  classes: ClassInfo[];
}

const SCHEDULES: Record<string, DaySchedule[]> = {
  C1: [
    {
      day: "Monday",
      classes: [
        { name: "Thermodynamics", timing: "9:00 AM - 10:00 AM", venue: "Room : CR526", faculty: "Prof. Neakanshika" },
        { name: "Biochemistry", timing: "11:00 AM - 12:00 PM", venue: "Room : G3", faculty: "Prof. Monika" },
        { name: "TUTE - Biochemistry", timing: "12:00 PM - 1:00 PM", venue: "Room : TS 8", faculty: "Prof. Monika" },
        { name: "GDB LAB", timing: "2:00 PM - 4:00 PM", venue: "Lab : BT 2", faculty: "Prof. Sujata" },
      ],
    },
    {
      day: "Tuesday",
      classes: [
        { name: "Genetics & Dev Bio", timing: "10:00 AM - 11:00 AM", venue: "Room : CS2", faculty: "Prof. Pooja" },
        { name: "Biochemistry", timing: "11:00 AM - 12:00 PM", venue: "Room : CS2", faculty: "Prof. Monika" },
        { name: "Environmental Science", timing: "12:00 PM - 1:00 PM", venue: "Room : FF2", faculty: "Prof. Nivedita" },
        { name: "Biochemical Techniques Lab", timing: "2:00 PM - 4:00 PM", venue: "BCL", faculty: "Prof. Monika" },
        { name: "Probability & Statistics", timing: "4:00 PM - 5:00 PM", venue: "G6", faculty: "Prof. Ayush Tripathi" },
      ],
    },
    {
      day: "Wednesday",
      classes: [
        { name: "Thermodynamics", timing: "10:00 AM - 11:00 AM", venue: "Room : G3", faculty: "Prof. Neakanshika" },
        { name: "Biochemistry", timing: "11:00 AM - 12:00 PM", venue: "Room : G3", faculty: "Prof. Monika" },
        { name: "TUTE : Thermodynamics", timing: "12:00 PM - 1:00 PM", venue: "Room : TS6", faculty: "Prof. Neakanshika" },
        { name: "TUTE : Probability & Statistics ", timing: "2:00 PM - 3:00 PM", venue: "Room : TS13", faculty: "Prof. Ayush" },
        { name: "Probability & Statistics ", timing: "3:00 PM - 4:00 PM", venue: "Room : G3", faculty: "Prof. Ayush" },
        { name: "ECONOMICS ", timing: "4:00 PM - 5:00 PM", venue: "Room : FF2", faculty: "Prof. Kanupriya" },
      ],
    },
    {
      day: "Thursday",
      classes: [
        { name: "Thermodynamics & Chemical Processes Lab", timing: "9:00 AM - 11:00 AM", venue: "Lab : BT1", faculty: "Prof. Shweta , Prof. Ekta , Prof . Neakanshika" },
        { name: "Genetics & Dev Bio", timing: "12:00 PM - 1:00 PM", venue: "Room : G7", faculty: "Prof. Pooja" },
        { name: "TUTE: Genetics & Dev Bio", timing: "2:00 PM - 3:00 PM", venue: "Room : TS11", faculty: "Prof. Pooja" },
        { name: "EVS", timing: "3:00 PM - 4:00 PM", venue: "Room : G3", faculty: "Prof. NIVEDITA" },
      ],
    },
    {
      day: "Friday",
      classes: [
        { name: "EVS", timing: "9:00 AM - 10:00 AM", venue: "Room : FF4", faculty: "Prof. NIVEDITA" },
        { name: "ECONOMICS ", timing: "10:00 AM - 11:00 AM", venue: "Room : F8", faculty: "Prof. Kanupriya" },
        { name: "Probability & Statistics ", timing: "11:00 PM - 12:00 PM", venue: "Room : F8", faculty: "Prof. Ayush" },
        { name: "TUTE : ECONOMICS ", timing: "12:00 AM - 1:00 AM", venue: "Room : TS12", faculty: "Prof. Neha Singh" },
      ],
    },
    {
      day: "Saturday",
      classes: [
        { name: "Genetics & Dev Bio", timing: "9:00 AM - 10:00 AM", venue: "Room : CS8", faculty: "Prof. Pooja" },
        { name: "Thermodynamics", timing: "10:00 AM - 11:00 AM", venue: "Room : FF3", faculty: "Prof. Neakanshika" },
      ],
    },
  ],
  C2: [
    {
      day: "Monday",
      classes: [
        { name: "Class 1", timing: "9:00 AM - 10:00 AM", venue: "Room : TBA", faculty: "Prof. TBA" },
        { name: "Class 2", timing: "11:00 AM - 12:00 PM", venue: "Room : TBA", faculty: "Prof. TBA" },
      ],
    },
    {
      day: "Tuesday",
      classes: [
        { name: "Class 1", timing: "10:00 AM - 11:00 AM", venue: "Room : TBA", faculty: "Prof. TBA" },
      ],
    },
    {
      day: "Wednesday",
      classes: [
        { name: "Class 1", timing: "10:00 AM - 11:00 AM", venue: "Room : TBA", faculty: "Prof. TBA" },
      ],
    },
    {
      day: "Thursday",
      classes: [
        { name: "Class 1", timing: "9:00 AM - 11:00 AM", venue: "Lab : TBA", faculty: "Prof. TBA" },
      ],
    },
    {
      day: "Friday",
      classes: [
        { name: "Class 1", timing: "9:00 AM - 10:00 AM", venue: "Room : TBA", faculty: "Prof. TBA" },
      ],
    },
    {
      day: "Saturday",
      classes: [
        { name: "Class 1", timing: "9:00 AM - 10:00 AM", venue: "Room : TBA", faculty: "Prof. TBA" },
      ],
    },
  ],
  C3: [
    {
      day: "Monday",
      classes: [
        { name: "Class 1", timing: "9:00 AM - 10:00 AM", venue: "Room : TBA", faculty: "Prof. TBA" },
        { name: "Class 2", timing: "11:00 AM - 12:00 PM", venue: "Room : TBA", faculty: "Prof. TBA" },
      ],
    },
    {
      day: "Tuesday",
      classes: [
        { name: "Class 1", timing: "10:00 AM - 11:00 AM", venue: "Room : TBA", faculty: "Prof. TBA" },
      ],
    },
    {
      day: "Wednesday",
      classes: [
        { name: "Class 1", timing: "10:00 AM - 11:00 AM", venue: "Room : TBA", faculty: "Prof. TBA" },
      ],
    },
    {
      day: "Thursday",
      classes: [
        { name: "Class 1", timing: "9:00 AM - 11:00 AM", venue: "Lab : TBA", faculty: "Prof. TBA" },
      ],
    },
    {
      day: "Friday",
      classes: [
        { name: "Class 1", timing: "9:00 AM - 10:00 AM", venue: "Room : TBA", faculty: "Prof. TBA" },
      ],
    },
    {
      day: "Saturday",
      classes: [
        { name: "Class 1", timing: "9:00 AM - 10:00 AM", venue: "Room : TBA", faculty: "Prof. TBA" },
      ],
    },
  ],
};

const BATCHES = ["C1", "C2", "C3"];

export const TimeTable = () => {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const [selectedDay, setSelectedDay] = useState(today);
  const [selectedBatch, setSelectedBatch] = useState("C1");
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  
  const currentSchedule = SCHEDULES[selectedBatch];
  const selectedDaySchedule = currentSchedule.find((schedule) => schedule.day === selectedDay);

  const handlePreviousDay = () => {
    const currentIndex = currentSchedule.findIndex((schedule) => schedule.day === selectedDay);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : currentSchedule.length - 1;
    setSelectedDay(currentSchedule[previousIndex].day);
  };

  const handleNextDay = () => {
    const currentIndex = currentSchedule.findIndex((schedule) => schedule.day === selectedDay);
    const nextIndex = currentIndex < currentSchedule.length - 1 ? currentIndex + 1 : 0;
    setSelectedDay(currentSchedule[nextIndex].day);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left - next day
      handleNextDay();
    }
    if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right - previous day
      handlePreviousDay();
    }
  };

return (
    <div className="min-h-screen bg-background p-6 md:p-8 relative">
      <HeartAnimation />
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Cat Logo */}
        <div className="w-full animate-fade-in">
          <img 
            src={catLogo} 
            alt="Cat Logo" 
            className="w-full h-32 md:h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Theme Toggle */}
        <div className="flex justify-center animate-fade-in">
          <ThemeToggle />
        </div>

        {/* Header */}
        <div className="text-center space-y-3 md:space-y-4 animate-fade-in">
          <div className="inline-block">
            <Badge className="text-sm md:text-lg px-4 md:px-6 py-1.5 md:py-2 bg-gradient-primary border-0 shadow-glow-primary">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              {today}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary px-4">
            My Class Schedule
          </h1>
          <p className="text-muted-foreground text-base md:text-lg px-4">
            Select batch and day to view your classes
          </p>
        </div>

        {/* Batch Selection */}
        <div className="space-y-3 md:space-y-4 animate-fade-in">
          <h2 className="text-lg md:text-xl font-semibold text-center text-foreground">
            Select Batch
          </h2>
          <div className="flex justify-center gap-3 md:gap-4 px-2">
            {BATCHES.map((batch) => (
              <Badge
                key={batch}
                variant={batch === selectedBatch ? "default" : "outline"}
                onClick={() => setSelectedBatch(batch)}
                className={`px-6 md:px-8 py-2.5 md:py-3 text-base md:text-lg cursor-pointer transition-all duration-300 ${
                  batch === selectedBatch
                    ? "bg-gradient-primary shadow-glow-primary border-0 scale-110"
                    : "hover:border-primary/50 hover:bg-primary/10 hover:scale-105"
                }`}
              >
                {batch}
              </Badge>
            ))}
          </div>
        </div>

        {/* Days Selection with Arrows */}
        <div className="space-y-3 md:space-y-4">
          <h2 className="text-lg md:text-xl font-semibold text-center text-foreground">
            Select Day
          </h2>
          <div className="flex items-center justify-center gap-2 md:gap-4 px-2">
            {/* Left Arrow */}
            <button
              onClick={handlePreviousDay}
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110"
              aria-label="Previous day"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Days */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {currentSchedule.map((schedule) => (
                <Badge
                  key={schedule.day}
                  variant={schedule.day === selectedDay ? "default" : "outline"}
                  onClick={() => setSelectedDay(schedule.day)}
                  className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-base cursor-pointer transition-all duration-300 ${
                    schedule.day === selectedDay
                      ? "bg-gradient-primary shadow-glow-primary border-0 scale-105"
                      : "hover:border-primary/50 hover:bg-primary/10 hover:scale-105"
                  }`}
                >
                  {schedule.day}
                </Badge>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNextDay}
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110"
              aria-label="Next day"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* Classes - Vertical on Mobile, Horizontal on Desktop */}
        {selectedDaySchedule ? (
          <div 
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Mobile: Vertical Stack */}
            <div className="md:hidden space-y-4">
              {selectedDaySchedule.classes.map((classInfo, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-2 border-primary/20 bg-gradient-card backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-glow-primary animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Soft overlay */}
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  
                  <div className="relative p-5 space-y-3">
                    {/* Class Name */}
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {classInfo.name}
                    </h3>

                    {/* Details */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                        <Clock className="w-4 h-4 text-secondary flex-shrink-0" />
                        <span className="text-sm font-medium">{classInfo.timing}</span>
                      </div>

                      <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                        <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-sm font-medium">{classInfo.venue}</span>
                      </div>

                      <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                        <User className="w-4 h-4 text-primary-glow flex-shrink-0" />
                        <span className="text-sm font-medium">{classInfo.faculty}</span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-secondary opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300" />
                </Card>
              ))}
            </div>

            {/* Desktop: Horizontal Scroll */}
            <div className="hidden md:block">
              <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-muted">
                <div className="flex gap-6 min-w-max px-2">
                  {selectedDaySchedule.classes.map((classInfo, index) => (
                    <Card
                      key={index}
                      className="group relative overflow-hidden border-2 border-primary/20 bg-gradient-card backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-glow-primary hover:scale-[1.05] animate-slide-in w-80 flex-shrink-0"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Soft overlay */}
                      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                      
                      <div className="relative p-6 space-y-4">
                        {/* Class Name */}
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {classInfo.name}
                        </h3>

                        {/* Details */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                            <Clock className="w-5 h-5 text-secondary" />
                            <span className="font-medium">{classInfo.timing}</span>
                          </div>

                          <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                            <MapPin className="w-5 h-5 text-accent" />
                            <span className="font-medium">{classInfo.venue}</span>
                          </div>

                          <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                            <User className="w-5 h-5 text-primary-glow" />
                            <span className="font-medium">{classInfo.faculty}</span>
                          </div>
                        </div>
                      </div>

                      {/* Decorative corner accent */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-secondary opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300" />
                    </Card>
                  ))}
                </div>
              </div>
              
              {/* Scroll hint - Desktop only */}
              <div className="text-center mt-4 text-sm text-muted-foreground">
                ← Scroll horizontally to see all classes →
              </div>
            </div>
          </div>
        ) : (
          <Card className="p-12 text-center bg-gradient-card border-2 border-primary/20">
            <div className="space-y-4">
              <div className="text-6xl">🎉</div>
              <h2 className="text-3xl font-bold text-primary">
                It's the Weekend!
              </h2>
              <p className="text-muted-foreground text-lg">
                No classes today. Time to relax and recharge!
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
