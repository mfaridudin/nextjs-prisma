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
    href: "/dashboard/admin",
  },

  { navlabel: true, subheader: "MASTER DATA" },

  {
    id: uniqueId(),
    title: "Students",
    icon: IconUsers,
    href: "/dashboard/admin/students",
  },
  {
    id: uniqueId(),
    title: "Teachers",
    icon: IconSchool,
    href: "/dashboard/admin/teachers",
  },
  {
    id: uniqueId(),
    title: "Class",
    icon: IconChalkboard,
    href: "/dashboard/admin/classroom",
  },
  {
    id: uniqueId(),
    title: "Course",
    icon: IconBook,
    href: "/dashboard/admin/course",
  },
];

export const menuTeacher = [
  { navlabel: true, subheader: "HOME" },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard/teacher",
  },

  { navlabel: true, subheader: "MASTER DATA" },

  {
    id: uniqueId(),
    title: "Students",
    icon: IconUsers,
    href: "/dashboard/teacher/students",
  },

  {
    id: uniqueId(),
    title: "Lesson",
    icon: IconBook2,
    href: "/dashboard/teacher/lesson",
  },

];

export const menuStudent = [
  { navlabel: true, subheader: "HOME" },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard/student",
  },

  { navlabel: true, subheader: "MASTER DATA" },
    {
    id: uniqueId(),
    title: "Lesson",
    icon: IconBook2,
    href: "/dashboard/student/lesson",
  },
];

export const menusByRole: Record<number, any[]> = {
  1: menuAdmin,
  2: menuTeacher,
  3: menuStudent,
};
