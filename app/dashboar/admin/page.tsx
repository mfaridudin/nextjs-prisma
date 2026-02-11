"use client"
import { useUserStore } from "@/store/useUserStore"

export default function page() {
  const { user } = useUserStore()

  // console.log("USER ADMIN PAGE:", user)
  return (
    <div>
      Hello, {user?.fullName}! This is the admin <br />
       Hello, {user?.school?.name}! This is the admin
      
      page Admin</div>
  )
}
