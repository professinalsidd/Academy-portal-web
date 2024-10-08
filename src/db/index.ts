export const SideBarListItem = [
  { label: "Dashboard", icon: "fa-solid fa-house" },
  { label: "Profile", icon: "fa-solid fa-user" },
  { label: "Projects", icon: "fa-solid fa-file" },
  // { label: "Overview", icon: "fa-solid fa-chart-simple" },
  {
    label: "Results",
    icon: "fa-solid fa-square-poll-vertical",
  },
  { label: "Payment", icon: "fa-solid fa-indian-rupee-sign" },
  { label: "Logout", icon: "fa-solid fa-right-from-bracket" },
];

export const timeData = [
  "9:00 AM to 10:00 AM",
  "10:00 AM to 11:00 AM",
  "11:00 AM to 12:00 PM",
  "12:00 PM to 1:00 PM",
  "1:00 PM to 2:00 PM",
  "2:00 PM to 3:00 PM",
  "3:00 PM to 4:00 PM",
  "4:00 PM to 5:00 PM",
  "5:00 PM to 6:00 PM",
  "6:00 PM to 7:00 PM",
  "7:00 PM to 8:00 PM",
  "8:00 PM to 9:00 PM",
];

export const subjectData = [
  "HTML && CSS",
  "JAVASCRIPT",
  "REACT JS",
  "REACT NATIVE",
  "NODE JS EXPRESS",
];

export const gradeData = ["A++", "A", "B", "C", "D", "E"];

// Prepare columns and data
export const paymentsTableColumnsForAdmin = [
  "studentId",
  "student",
  "amount",
  "status",
  "paymentDate",
];

export const paymentsTableColumnsForStudents = [
  "amount",
  "status",
  "paymentDate",
];

export const resultTableColumnsForAdmin = [
  "student.email",
  "student.studentId",
  "marks",
  "subject",
  "grade",
  "createdAt",
];

export const resultTableColumnsForStudent = [
  "student.email",
  "marks",
  "subject",
  "grade",
  "createdAt",
];

export const projectsTableColumnsForAdmin = [
  "uploadedBy.organizationName",
  "uploadedBy.email",
  "uploadedBy.phone",
  "projectName",
  "githubLink",
  "uploadDate",
];

export const projectsTableColumnsForStudents = [
  "projectName",
  "githubLink",
  "uploadDate",
];

export const dashBoardCardData = [
  {
    icon: "fa-brands fa-html5",
    label: "HTML Projects",
    bg: "#E34F26",
    color: "#fff",
    completion: 85,
  },
  {
    icon: "fa-brands fa-css3-alt",
    label: "CSS Project",
    bg: "#1572B6",
    color: "#fff",
    completion: 70,
  },
  {
    icon: "fa-brands fa-js",
    label: "JS Project",
    bg: "#F7DF1E",
    color: "#333",
    completion: 90,
  },
  {
    icon: "fa-brands fa-react",
    label: "React",
    bg: "#61DAFB",
    color: "#333",
    completion: 60,
  },
  {
    icon: "fa-brands fa-react",
    label: "React Native",
    bg: "#61DAFB",
    color: "#333",
    completion: 70,
  },
  {
    icon: "fa-brands fa-node-js",
    label: "Node.js",
    bg: "#339933",
    color: "#fff",
    completion: 0,
  },
  {
    icon: "fa-solid fa-database",
    label: "MongoDB",
    bg: "#47A248",
    color: "#fff",
    completion: 0,
  },
  {
    icon: "fa-brands fa-js",
    label: "TypeScript",
    bg: "#007ACC",
    color: "#fff",
    completion: 0,
  },
];

export const genderData = ["Male", "Female", "Others"];
export const roleData = ["Management", "Student", "Teacher"];
export const paymentStatusData = ["due", "paid"];

export const scatterChartData = [
  {
    id: "data-0",
    x1: 329.39,
    x2: 391.29,
    y1: 443.28,
    y2: 153.9,
  },
  {
    id: "data-1",
    x1: 96.94,
    x2: 139.6,
    y1: 110.5,
    y2: 217.8,
  },
  {
    id: "data-2",
    x1: 336.35,
    x2: 282.34,
    y1: 175.23,
    y2: 286.32,
  },
  {
    id: "data-3",
    x1: 159.44,
    x2: 384.85,
    y1: 195.97,
    y2: 325.12,
  },
  {
    id: "data-4",
    x1: 188.86,
    x2: 182.27,
    y1: 351.77,
    y2: 144.58,
  },
  {
    id: "data-5",
    x1: 143.86,
    x2: 360.22,
    y1: 43.253,
    y2: 146.51,
  },
  {
    id: "data-6",
    x1: 202.02,
    x2: 209.5,
    y1: 376.34,
    y2: 309.69,
  },
  {
    id: "data-7",
    x1: 384.41,
    x2: 258.93,
    y1: 31.514,
    y2: 236.38,
  },
  {
    id: "data-8",
    x1: 256.76,
    x2: 70.571,
    y1: 231.31,
    y2: 440.72,
  },
  {
    id: "data-9",
    x1: 143.79,
    x2: 419.02,
    y1: 108.04,
    y2: 20.29,
  },
  {
    id: "data-10",
    x1: 103.48,
    x2: 15.886,
    y1: 321.77,
    y2: 484.17,
  },
  {
    id: "data-11",
    x1: 272.39,
    x2: 189.03,
    y1: 120.18,
    y2: 54.962,
  },
  {
    id: "data-12",
    x1: 23.57,
    x2: 456.4,
    y1: 366.2,
    y2: 418.5,
  },
  {
    id: "data-13",
    x1: 219.73,
    x2: 235.96,
    y1: 451.45,
    y2: 181.32,
  },
  {
    id: "data-14",
    x1: 54.99,
    x2: 434.5,
    y1: 294.8,
    y2: 440.9,
  },
  {
    id: "data-15",
    x1: 134.13,
    x2: 383.8,
    y1: 121.83,
    y2: 273.52,
  },
  {
    id: "data-16",
    x1: 12.7,
    x2: 270.8,
    y1: 287.7,
    y2: 346.7,
  },
  {
    id: "data-17",
    x1: 176.51,
    x2: 119.17,
    y1: 134.06,
    y2: 74.528,
  },
  {
    id: "data-18",
    x1: 65.05,
    x2: 78.93,
    y1: 104.5,
    y2: 150.9,
  },
  {
    id: "data-19",
    x1: 162.25,
    x2: 63.707,
    y1: 413.07,
    y2: 26.483,
  },
  {
    id: "data-20",
    x1: 68.88,
    x2: 150.8,
    y1: 74.68,
    y2: 333.2,
  },
  {
    id: "data-21",
    x1: 95.29,
    x2: 329.1,
    y1: 360.6,
    y2: 422.0,
  },
  {
    id: "data-22",
    x1: 390.62,
    x2: 10.01,
    y1: 330.72,
    y2: 488.06,
  },
];
