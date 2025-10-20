import { useState } from "react";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import catLogo from "@/assets/cat-logo.png";

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

const SCHEDULE: DaySchedule[] = [
  {
    day: "Monday",
    classes: [
      { name: "Data Structures", timing: "9:00 AM - 10:00 AM", venue: "Room 301", faculty: "Prof. Tanaka" },
      { name: "Web Development", timing: "10:15 AM - 11:15 AM", venue: "Lab 2B", faculty: "Prof. Sakura" },
      { name: "Database Systems", timing: "11:30 AM - 12:30 PM", venue: "Room 405", faculty: "Prof. Yamamoto" },
      { name: "Machine Learning", timing: "2:00 PM - 3:00 PM", venue: "Room 201", faculty: "Prof. Hikari" },
    ],
  },
  {
    day: "Tuesday",
    classes: [
      { name: "Algorithms", timing: "9:00 AM - 10:00 AM", venue: "Room 302", faculty: "Prof. Kenji" },
      { name: "Mobile Development", timing: "10:15 AM - 11:15 AM", venue: "Lab 3A", faculty: "Prof. Akira" },
      { name: "Cloud Computing", timing: "11:30 AM - 12:30 PM", venue: "Room 410", faculty: "Prof. Yuki" },
      { name: "UI/UX Design", timing: "2:00 PM - 3:00 PM", venue: "Studio 1", faculty: "Prof. Hana" },
    ],
  },
  {
    day: "Wednesday",
    classes: [
      { name: "Computer Networks", timing: "9:00 AM - 10:00 AM", venue: "Room 305", faculty: "Prof. Ryu" },
      { name: "Software Engineering", timing: "10:15 AM - 11:15 AM", venue: "Room 402", faculty: "Prof. Mai" },
      { name: "Cyber Security", timing: "11:30 AM - 12:30 PM", venue: "Lab 4C", faculty: "Prof. Sora" },
      { name: "Artificial Intelligence", timing: "2:00 PM - 3:00 PM", venue: "Room 203", faculty: "Prof. Ren" },
    ],
  },
  {
    day: "Thursday",
    classes: [
      { name: "Operating Systems", timing: "9:00 AM - 10:00 AM", venue: "Room 308", faculty: "Prof. Kaito" },
      { name: "Game Development", timing: "10:15 AM - 11:15 AM", venue: "Lab 5D", faculty: "Prof. Nami" },
      { name: "Blockchain Tech", timing: "11:30 AM - 12:30 PM", venue: "Room 415", faculty: "Prof. Shin" },
      { name: "DevOps", timing: "2:00 PM - 3:00 PM", venue: "Lab 2A", faculty: "Prof. Aoi" },
    ],
  },
  {
    day: "Friday",
    classes: [
      { name: "Data Analytics", timing: "9:00 AM - 10:00 AM", venue: "Room 310", faculty: "Prof. Haru" },
      { name: "Project Workshop", timing: "10:15 AM - 12:30 PM", venue: "Lab 6E", faculty: "Prof. Miku" },
      { name: "Seminar", timing: "2:00 PM - 3:00 PM", venue: "Auditorium", faculty: "Guest Speaker" },
    ],
  },
];

export const TimeTable = () => {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const [selectedDay, setSelectedDay] = useState(today);
  
  const selectedDaySchedule = SCHEDULE.find((schedule) => schedule.day === selectedDay);

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Cat Logo */}
        <div className="flex justify-center animate-fade-in">
          <img 
            src={catLogo} 
            alt="Cat Logo" 
            className="w-32 h-32 md:w-40 md:h-40 object-contain hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="inline-block">
            <Badge className="text-lg px-6 py-2 bg-gradient-primary border-0 shadow-glow-primary">
              <Calendar className="w-5 h-5 mr-2" />
              {today}
            </Badge>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-primary">
            Your Class Schedule
          </h1>
          <p className="text-muted-foreground text-lg">
            Select a day to view your classes
          </p>
        </div>

        {/* Days Selection at Top */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center text-foreground">
            Select Day
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {SCHEDULE.map((schedule) => (
              <Badge
                key={schedule.day}
                variant={schedule.day === selectedDay ? "default" : "outline"}
                onClick={() => setSelectedDay(schedule.day)}
                className={`px-6 py-3 text-base cursor-pointer transition-all duration-300 ${
                  schedule.day === selectedDay
                    ? "bg-gradient-primary shadow-glow-primary border-0 scale-105"
                    : "hover:border-primary/50 hover:bg-primary/10 hover:scale-105"
                }`}
              >
                {schedule.day}
              </Badge>
            ))}
          </div>
        </div>

        {/* Horizontal Scrolling Classes */}
        {selectedDaySchedule ? (
          <div className="relative">
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
            
            {/* Scroll hint */}
            <div className="text-center mt-4 text-sm text-muted-foreground">
              ← Scroll horizontally to see all classes →
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
