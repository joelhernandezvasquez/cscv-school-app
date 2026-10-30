import {
  CompletedCourse,
  CourseParticipant,
  CourseParticipantRow,
  CoursePieChartData,
  CoursesByLevel,
  PendingCourses,
} from "@/types";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (imagePath: string) => {
  if (/^https?:\/\//.test(imagePath)) return imagePath;
  const serverOrigin = (process.env.NEXT_PUBLIC_SERVER_URL ?? "").replace(
    /\/api\/?$/,
    "",
  );
  return `${serverOrigin}${imagePath}`;
};
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const getLoginFieldErrors = (
  email: string,
  password: string,
): { email?: string; password?: string } => {
  const errors: { email?: string; password?: string } = {};

  if (email.length === 0) errors.email = "Email cannot be empty";
  else if (!EMAIL_PATTERN.test(email))
    errors.email = "Enter a valid email address";

  if (password.length === 0) errors.password = "Password cannot be empty";

  return errors;
};

const PAGE_NAME_LABELS: Record<string, string> = {
  "Course-report": "Reports",
};

export const getPageNameFromPath = (path: string) => {
  let pathName = path.replace("/", "");
  const firstLetter = pathName[0].toUpperCase();
  pathName = `${firstLetter}${pathName.slice(1)}`;

  // it is a Slug page then
  if (pathName.includes("/")) {
    const slashIndex = pathName.indexOf("/");
    pathName = pathName.slice(0, slashIndex);
  }
  return PAGE_NAME_LABELS[pathName] ?? pathName;
};

export const getFirstLetterUpperCase = (text: string) => {
  const firstLetter = text[0].toUpperCase();
  return `${firstLetter}${text.slice(1)}`;
};

export const getOnlyUserName = (userName: string) => {
  const name = getFirstLetterUpperCase(userName);
  const whiteSpace = name.indexOf(" ");
  return `${name.slice(0, whiteSpace)}`;
};

export const getFormattedDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getFormattedAddress = (address: string) => {
  const studentDirrection = address.split(",");
  const studentAddress = {
    street: studentDirrection[0],
    city: studentDirrection[1],
    state: studentDirrection[2],
    zipcode: studentDirrection[3],
  };
  return studentAddress;
};

export const getCoursePercentange = (
  completed: number,
  currentQuantity: number,
) => {
  const percentage = (completed / currentQuantity) * 100;
  return Number.isFinite(percentage) ? percentage.toFixed(2) : "0.00";
};

export const formatCourseLevel = (level: string) => {
  return level
    .replace(/NIVEL_1_JESUS_ESTA_VIVO/, "level1")
    .replace(/NIVEL_2_JESUS_NOS_CAPACITA/, "level2")
    .replace(/NIVEL_3_JESUS_NOS_ENVIA/, "level3")
    .replace(/RENACER_MUJERES/, "renacer")
    .replace(/RENACER_HOMBRE/, "renacer")
    .replace(/RENACER_PAREJAS/, "renacer");
};

// Form label (courseLevel in src/lib/constants.tsx) -> backend enum. Each Renacer variant
// needs its own label: a single "Renacer" option cannot say which enum to save.
const LEVEL_LABEL_TO_ENUM: Record<string, string> = {
  "Nivel 1 Jesus Esta Vivo": "NIVEL_1_JESUS_ESTA_VIVO",
  "Nivel 2 Jesus Nos Capacita": "NIVEL_2_JESUS_NOS_CAPACITA",
  "Nivel 3 Jesus Nos Envia": "NIVEL_3_JESUS_NOS_ENVIA",
  "Renacer Mujeres": "RENACER_MUJERES",
  "Renacer Hombres": "RENACER_HOMBRE",
  "Renacer Parejas": "RENACER_PAREJAS",
};

export const formatLevel = (level: string) => {
  return LEVEL_LABEL_TO_ENUM[level] ?? level;
};

export const formatLevelToName = (level: string) => {
  level = level.replaceAll(" ", "").toLowerCase();

  return level
    .replace(/level1/, "NIVEL_1_JESUS_ESTA_VIVO")
    .replace(/level2/, "NIVEL_2_JESUS_NOS_CAPACITA")
    .replace(/level3/, "NIVEL_3_JESUS_NOS_ENVIA")
    .replace(/Renacer/, "Renacer");
};

export const formatCourseLevelName = (level: string) => {
  return level
    .replace(/NIVEL_1_JESUS_ESTA_VIVO/, "Nivel 1")
    .replace(/NIVEL_2_JESUS_NOS_CAPACITA/, "Nivel 2")
    .replace(/NIVEL_3_JESUS_NOS_ENVIA/, "Nivel 3")
    .replace(/RENACER_MUJERES/, "Renacer")
    .replace(/RENACER_HOMBRE/, "Renacer")
    .replace(/RENACER_PAREJAS/, "Renacer");
};

export const formatLevelName = (level: string) => {
  return level
    .replace(/level1/, "Nivel 1")
    .replace(/level2/, "Nivel 2")
    .replace(/level3/, "Nivel 3")
    .replace(/renacer/, "Renacer")
    .replace(/ongoing/, "Active")
    .replace(/upcoming/, "Upcoming")
    .replace(/complete/, "Complete")
    .replace(/cancelled/, "Cancel");
};

export const getCoursesFormatted = (
  courses: PendingCourses[] | CompletedCourse[],
) => {
  return courses.map((course) => {
    return {
      ...course,
      level: formatCourseLevel(course.level),
      nivel: formatCourseLevelName(course.level),
    };
  });
};

export const mappedPendingCourses = (pendingCourses: PendingCourses[]) => {
  return pendingCourses.map((course) => {
    return {
      id: course.id,
      name: course.name,
      description: course.description,
      level: formatCourseLevel(course.level),
      complete: false,
      date: null,
    };
  });
};

export const formatCoursesByLevelToChartData = (
  coursesByLevel: CoursesByLevel[],
): CoursePieChartData[] => {
  const nivel1 = coursesByLevel.find((element) =>
    element.level.includes("Nivel 1"),
  );
  const nivel2 = coursesByLevel.find((element) =>
    element.level.includes("Nivel 2"),
  );
  const nivel3 = coursesByLevel.find((element) =>
    element.level.includes("Nivel 3"),
  );

  const renacerTotal = coursesByLevel.reduce((acc, course) => {
    if (course.level.toLowerCase().includes("renacer")) {
      return acc + course.courseLevelQuantity;
    }
    return acc;
  }, 0);

  const chartData = [
    {
      browser: "Nivel 1",
      visitors: nivel1?.courseLevelQuantity ?? 0,
      fill: "#a30f12",
    },
    {
      browser: "Nivel 2",
      visitors: nivel2?.courseLevelQuantity ?? 0,
      fill: "#12a9a6",
    },
    {
      browser: "Nivel 3",
      visitors: nivel3?.courseLevelQuantity ?? 0,
      fill: "#f5c544",
    },
    { browser: "Renacer", visitors: renacerTotal, fill: "#5655d7" },
  ];
  return chartData;
};

// "completed" rows nest the student; "not-completed" rows are flat students.
export const normalizeParticipant = (
  row: CourseParticipantRow,
): CourseParticipant =>
  "student" in row
    ? { ...row.student, id: row.id, completed_at: row.completedAt }
    : { ...row, completed_at: null };

export const getDiffDays = (eventDate: Date) => {
  const today = new Date();
  const diffTime = Math.abs(new Date(eventDate).getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export function getMonthDifference(eventDate: Date): number {
  const today = new Date();
  const d2 = new Date(eventDate);
  return Math.abs(
    (today.getFullYear() - d2.getFullYear()) * 12 +
      (today.getMonth() - d2.getMonth()),
  );
}
