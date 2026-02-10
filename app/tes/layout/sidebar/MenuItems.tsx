import {
  IconBook,
  IconChalkboard,
  IconLayoutDashboard,
  IconSchool,
  IconUsers,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "HOME",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/tes/admin",
  },
  {
    navlabel: true,
    subheader: "MASTER DATA",
  },
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

export default Menuitems;


