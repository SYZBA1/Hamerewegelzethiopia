export type LessonType = "video" | "document" | "reading";

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  completed: boolean;
  resources: string[];
}

export interface Course {
  id: string;
  title: string;
  category: string;
  instructor: string;
  description: string;
  outcomes: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  lessonsCount: number;
  progress: number;
  enrolled: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  thumbnail: string;
  lessons: Lesson[];
}

export const courses: Course[] = [
  {
    id: "biblical-foundations",
    title: "Biblical Foundations",
    category: "Theology",
    instructor: "Dr. Abebe",
    description: "A core course on biblical interpretation, doctrine, and foundational theology for ministry.",
    outcomes: [
      "Understand core biblical themes",
      "Apply interpretation frameworks",
      "Connect doctrine with practical ministry",
    ],
    difficulty: "Beginner",
    duration: "8 weeks",
    lessonsCount: 24,
    progress: 75,
    enrolled: true,
    isPopular: true,
    thumbnail: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80",
    lessons: [
      { id: "l1", title: "Introduction to Scripture", type: "video", duration: "14 min", completed: true, resources: ["Slides", "Reading PDF"] },
      { id: "l2", title: "Context and Canon", type: "reading", duration: "20 min", completed: true, resources: ["Workbook"] },
      { id: "l3", title: "Old Testament Survey", type: "video", duration: "18 min", completed: true, resources: ["Lecture Notes"] },
      { id: "l4", title: "New Testament Survey", type: "document", duration: "16 min", completed: false, resources: ["Handout"] },
      { id: "l5", title: "Hermeneutics Basics", type: "video", duration: "21 min", completed: false, resources: ["Case Study"] },
    ],
  },
  {
    id: "church-history",
    title: "Church History",
    category: "History",
    instructor: "Pastor Alemayehu",
    description: "Explore major periods of church history and their impact on modern Christian life.",
    outcomes: ["Map key historical periods", "Identify influential leaders", "Interpret doctrinal developments"],
    difficulty: "Intermediate",
    duration: "7 weeks",
    lessonsCount: 18,
    progress: 60,
    enrolled: true,
    thumbnail: "https://images.unsplash.com/photo-1455885666463-9a42f5f48c5f?auto=format&fit=crop&w=900&q=80",
    lessons: [
      { id: "l1", title: "Early Church Era", type: "video", duration: "13 min", completed: true, resources: ["Timeline PDF"] },
      { id: "l2", title: "Reformation Movement", type: "document", duration: "17 min", completed: true, resources: ["Discussion Guide"] },
      { id: "l3", title: "Missions Expansion", type: "reading", duration: "15 min", completed: false, resources: ["Primary Sources"] },
    ],
  },
  {
    id: "pastoral-care",
    title: "Pastoral Care",
    category: "Ministry",
    instructor: "Dr. Miriam",
    description: "Develop counseling, visitation, and pastoral response skills for local church ministry.",
    outcomes: ["Strengthen care ministry", "Lead crisis response", "Practice biblical counseling"],
    difficulty: "Intermediate",
    duration: "6 weeks",
    lessonsCount: 20,
    progress: 45,
    enrolled: true,
    thumbnail: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
    lessons: [
      { id: "l1", title: "Pastoral Identity", type: "reading", duration: "11 min", completed: true, resources: ["Reading Notes"] },
      { id: "l2", title: "Care Conversations", type: "video", duration: "19 min", completed: false, resources: ["Practice Sheet"] },
      { id: "l3", title: "Hospital and Home Visits", type: "document", duration: "14 min", completed: false, resources: ["Checklist"] },
    ],
  },
  {
    id: "ministry-leadership",
    title: "Ministry Leadership",
    category: "Leadership",
    instructor: "Bishop Samuel",
    description: "Build leadership habits, team communication, and decision-making for ministry contexts.",
    outcomes: ["Lead teams effectively", "Create ministry plans", "Resolve conflict biblically"],
    difficulty: "Advanced",
    duration: "9 weeks",
    lessonsCount: 16,
    progress: 80,
    enrolled: true,
    isPopular: true,
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    lessons: [
      { id: "l1", title: "Vision and Values", type: "video", duration: "15 min", completed: true, resources: ["Worksheet"] },
      { id: "l2", title: "Leading Volunteers", type: "document", duration: "17 min", completed: true, resources: ["Template"] },
      { id: "l3", title: "Healthy Communication", type: "reading", duration: "12 min", completed: false, resources: ["Guide"] },
    ],
  },
  {
    id: "advanced-theology",
    title: "Advanced Theology",
    category: "Theology",
    instructor: "Dr. Habtamu",
    description: "Deep theological analysis for advanced students preparing for research and teaching ministry.",
    outcomes: ["Analyze advanced doctrines", "Construct biblical arguments", "Develop teaching notes"],
    difficulty: "Advanced",
    duration: "10 weeks",
    lessonsCount: 22,
    progress: 0,
    enrolled: false,
    isNew: true,
    thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=80",
    lessons: [
      { id: "l1", title: "Doctrine of God", type: "video", duration: "20 min", completed: false, resources: ["Reading Pack"] },
      { id: "l2", title: "Christology", type: "document", duration: "18 min", completed: false, resources: ["Reference Notes"] },
    ],
  },
  {
    id: "homiletics",
    title: "Homiletics",
    category: "Ministry",
    instructor: "Pastor Tadelle",
    description: "Learn sermon structure, biblical exposition, and effective preaching communication.",
    outcomes: ["Write sermon outlines", "Deliver clear biblical messages", "Evaluate preaching impact"],
    difficulty: "Beginner",
    duration: "5 weeks",
    lessonsCount: 14,
    progress: 0,
    enrolled: false,
    isPopular: true,
    thumbnail: "https://images.unsplash.com/photo-1462536943532-57a629f6cc60?auto=format&fit=crop&w=900&q=80",
    lessons: [
      { id: "l1", title: "Sermon Preparation", type: "video", duration: "16 min", completed: false, resources: ["Outline Template"] },
      { id: "l2", title: "Delivery Techniques", type: "reading", duration: "13 min", completed: false, resources: ["Practice Notes"] },
    ],
  },
];

export function findCourseById(courseId: string) {
  return courses.find((course) => course.id === courseId);
}

export function enrolledCourses() {
  return courses.filter((course) => course.enrolled);
}

export function availableCourses() {
  return courses.filter((course) => !course.enrolled);
}
