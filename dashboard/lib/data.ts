// ─── Types ───────────────────────────────────────────────────────────────────

export type PlanType = "Basic" | "Advanced" | "One-to-One";

export interface Course {
  id: string;
  name: string;
  plan: PlanType;
  price: number;
  priceLabel: string;
  enrollments: number;
  status: "Active" | "Inactive";
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  courseInterested: string;
  childGrade: string;
  message: string;
  submittedAt: string;
  status: "New" | "Contacted" | "Enrolled" | "Closed";
}

export interface MonthlyData {
  month: string;
  basic: number;
  advanced: number;
  oneToOne: number;
}

// ─── Courses ─────────────────────────────────────────────────────────────────

export const courses: Course[] = [
  // Basic Plan
  { id: "b1",  name: "Rubik's Cube Basics",    plan: "Basic",      price: 499,  priceLabel: "₹499/batch",   enrollments: 18, status: "Active" },
  { id: "b2",  name: "Multiplication Tables",   plan: "Basic",      price: 499,  priceLabel: "₹499/batch",   enrollments: 20, status: "Active" },
  { id: "b3",  name: "Handwriting Improvement", plan: "Basic",      price: 499,  priceLabel: "₹499/batch",   enrollments: 15, status: "Active" },
  { id: "b4",  name: "Yoga for Kids",           plan: "Basic",      price: 499,  priceLabel: "₹499/batch",   enrollments: 19, status: "Active" },
  { id: "b5",  name: "Yoga for Women",          plan: "Basic",      price: 499,  priceLabel: "₹499/batch",   enrollments: 14, status: "Active" },
  { id: "b6",  name: "Exercise for Kids",       plan: "Basic",      price: 499,  priceLabel: "₹499/batch",   enrollments: 12, status: "Active" },
  { id: "b7",  name: "Exercise for Elders",     plan: "Basic",      price: 499,  priceLabel: "₹499/batch",   enrollments: 9,  status: "Active" },
  { id: "b8",  name: "Dance for Kids",          plan: "Basic",      price: 499,  priceLabel: "₹499/batch",   enrollments: 20, status: "Active" },
  { id: "b9",  name: "Dance for Women",         plan: "Basic",      price: 499,  priceLabel: "₹499/batch",   enrollments: 16, status: "Active" },
  { id: "b10", name: "Basic Drawing",           plan: "Basic",      price: 499,  priceLabel: "₹499/batch",   enrollments: 17, status: "Active" },
  { id: "b11", name: "Crafts & Lipan Art",      plan: "Basic",      price: 499,  priceLabel: "₹499/batch",   enrollments: 11, status: "Active" },
  { id: "b12", name: "Amaravya Keerthanas",     plan: "Basic",      price: 499,  priceLabel: "₹499/batch",   enrollments: 8,  status: "Active" },
  // Advanced Plan
  { id: "a1",  name: "English 360°",            plan: "Advanced",   price: 1500, priceLabel: "₹1,500/month", enrollments: 5,  status: "Active" },
  { id: "a2",  name: "Phonics",                 plan: "Advanced",   price: 1500, priceLabel: "₹1,500/month", enrollments: 4,  status: "Active" },
  { id: "a3",  name: "Grammar",                 plan: "Advanced",   price: 1500, priceLabel: "₹1,500/month", enrollments: 5,  status: "Active" },
  { id: "a4",  name: "Telugu",                  plan: "Advanced",   price: 899,  priceLabel: "₹899/month",   enrollments: 5,  status: "Active" },
  { id: "a5",  name: "Hindi",                   plan: "Advanced",   price: 1300, priceLabel: "₹1,300/month", enrollments: 3,  status: "Active" },
  { id: "a6",  name: "Speed Maths",             plan: "Advanced",   price: 1300, priceLabel: "₹1,300/month", enrollments: 4,  status: "Active" },
  { id: "a7",  name: "Karrasamu Classes",       plan: "Advanced",   price: 1500, priceLabel: "₹1,500/month", enrollments: 2,  status: "Active" },
  // One-to-One
  { id: "o1",  name: "English 360°",            plan: "One-to-One", price: 3000, priceLabel: "₹3,000/month", enrollments: 3,  status: "Active" },
  { id: "o2",  name: "Phonics",                 plan: "One-to-One", price: 3000, priceLabel: "₹3,000/month", enrollments: 2,  status: "Active" },
  { id: "o3",  name: "Grammar",                 plan: "One-to-One", price: 3000, priceLabel: "₹3,000/month", enrollments: 1,  status: "Active" },
  { id: "o4",  name: "Telugu",                  plan: "One-to-One", price: 2500, priceLabel: "₹2,500/month", enrollments: 2,  status: "Active" },
  { id: "o5",  name: "Hindi",                   plan: "One-to-One", price: 2500, priceLabel: "₹2,500/month", enrollments: 1,  status: "Active" },
  { id: "o6",  name: "Speed Maths",             plan: "One-to-One", price: 3000, priceLabel: "₹3,000/month", enrollments: 2,  status: "Active" },
  { id: "o7",  name: "Karrasamu Classes",       plan: "One-to-One", price: 3000, priceLabel: "₹3,000/month", enrollments: 1,  status: "Active" },
];

// ─── Inquiries ───────────────────────────────────────────────────────────────

export const inquiries: Inquiry[] = [
  { id: "i1",  name: "Priya Sharma",    phone: "9876543210", courseInterested: "English 360°",        childGrade: "Class 4 – 6",    message: "My daughter is interested in English speaking classes.",                    submittedAt: "2024-11-01", status: "Enrolled"   },
  { id: "i2",  name: "Ravi Kumar",      phone: "9765432109", courseInterested: "Yoga for Kids",       childGrade: "Class 1 – 3",    message: "Looking for weekend yoga sessions.",                                       submittedAt: "2024-11-03", status: "Contacted"  },
  { id: "i3",  name: "Anita Reddy",     phone: "9654321098", courseInterested: "Speed Maths",         childGrade: "Class 7 – 9",    message: "My son needs help with maths.",                                            submittedAt: "2024-11-05", status: "New"        },
  { id: "i4",  name: "Suresh Babu",     phone: "9543210987", courseInterested: "Dance for Kids",      childGrade: "KG / LKG / UKG", message: "Interested in dance classes for my 5-year-old.",                          submittedAt: "2024-11-06", status: "Enrolled"   },
  { id: "i5",  name: "Meena Rao",       phone: "9432109876", courseInterested: "Telugu",              childGrade: "Class 4 – 6",    message: "We want to improve Telugu reading and writing.",                           submittedAt: "2024-11-08", status: "Contacted"  },
  { id: "i6",  name: "Kiran Varma",     phone: "9321098765", courseInterested: "Phonics",             childGrade: "Pre-KG / Nursery", message: "My 4-year-old needs phonics training.",                                 submittedAt: "2024-11-09", status: "New"        },
  { id: "i7",  name: "Lakshmi Devi",    phone: "9210987654", courseInterested: "Yoga for Women",      childGrade: "Adult Learner",   message: "Interested in morning yoga sessions.",                                     submittedAt: "2024-11-10", status: "Enrolled"   },
  { id: "i8",  name: "Venkat Prasad",   phone: "9109876543", courseInterested: "Karrasamu Classes",   childGrade: "Class 7 – 9",    message: "Traditional music is our family interest.",                                submittedAt: "2024-11-12", status: "Contacted"  },
  { id: "i9",  name: "Padma Sundari",   phone: "9098765432", courseInterested: "Drawing",             childGrade: "Class 1 – 3",    message: "My child loves art. Need a structured program.",                           submittedAt: "2024-11-14", status: "New"        },
  { id: "i10", name: "Arun Chandra",    phone: "8987654321", courseInterested: "Grammar",             childGrade: "Class 10 & Above", message: "Need 1-to-1 grammar coaching for competitive exams.",                    submittedAt: "2024-11-15", status: "Enrolled"   },
  { id: "i11", name: "Sonia Patel",     phone: "8876543210", courseInterested: "Hindi",               childGrade: "Class 4 – 6",    message: "My child needs help with Hindi grammar and reading.",                      submittedAt: "2024-11-16", status: "New"        },
  { id: "i12", name: "Deepak Nair",     phone: "8765432109", courseInterested: "Handwriting",         childGrade: "Class 1 – 3",    message: "Handwriting is poor. Looking for improvement classes.",                    submittedAt: "2024-11-17", status: "Contacted"  },
];

// ─── Analytics ───────────────────────────────────────────────────────────────

export const monthlyEnrollments: MonthlyData[] = [
  { month: "Jun", basic: 42, advanced: 14, oneToOne: 5  },
  { month: "Jul", basic: 55, advanced: 18, oneToOne: 7  },
  { month: "Aug", basic: 63, advanced: 21, oneToOne: 8  },
  { month: "Sep", basic: 70, advanced: 24, oneToOne: 10 },
  { month: "Oct", basic: 78, advanced: 28, oneToOne: 12 },
  { month: "Nov", basic: 85, advanced: 31, oneToOne: 14 },
];

// ─── Stats ───────────────────────────────────────────────────────────────────

export const dashboardStats = {
  totalCourses:      courses.length,
  totalEnrollments:  courses.reduce((s, c) => s + c.enrollments, 0),
  demoRequests:      inquiries.filter(i => i.status === "New" || i.status === "Contacted").length,
  whatsappInquiries: 47,
};

export const popularCourses = [...courses]
  .sort((a, b) => b.enrollments - a.enrollments)
  .slice(0, 5);
