import Course from "@/components/dashboard/course"

export default async function page() {
  // const { user } = useUserStore()
  const res = await fetch('http://localhost:3000/api/course', {
    cache: 'no-store'
  });

  const data = await res.json();
  console.log("USER TEACHER PAGE:", data)
  return <Course courses={data} />

}
