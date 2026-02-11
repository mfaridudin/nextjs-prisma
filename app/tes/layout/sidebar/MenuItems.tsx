import {
  IconBook,
  IconBook2,
  IconChalkboard,
  IconLayoutDashboard,
  IconSchool,
  IconUsers,
} from "@tabler/icons-react";
import { uniqueId } from "lodash";

export const menuAdmin = [
  { navlabel: true, subheader: "HOME" },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/tes/admin",
  },

  { navlabel: true, subheader: "MASTER DATA" },

  {
    id: uniqueId(),
    title: "Students",
    icon: IconUsers,
    href: "/tes/admin/students",
  },
  {
    id: uniqueId(),
    title: "Teachers",
    icon: IconSchool,
    href: "/tes/admin/teachers",
  },
  {
    id: uniqueId(),
    title: "Class",
    icon: IconChalkboard,
    href: "/tes/admin/classroom",
  },
  {
    id: uniqueId(),
    title: "Course",
    icon: IconBook,
    href: "/tes/admin/course",
  },
];

export const menuTeacher = [
  { navlabel: true, subheader: "HOME" },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/tes/teacher",
  },

  { navlabel: true, subheader: "MASTER DATA" },

  {
    id: uniqueId(),
    title: "Students",
    icon: IconUsers,
    href: "/tes/teacher/students",
  },

  {
    id: uniqueId(),
    title: "Lesson",
    icon: IconBook2,
    href: "/tes/teacher/lesson",
  },

];

export const menuStudent = [
  { navlabel: true, subheader: "HOME" },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/tes/student",
  },

  { navlabel: true, subheader: "MASTER DATA" },
    {
    id: uniqueId(),
    title: "Lesson",
    icon: IconBook2,
    href: "/tes/student/lesson",
  },
];

export const menusByRole: Record<number, any[]> = {
  1: menuAdmin,
  2: menuTeacher,
  3: menuStudent,
};
