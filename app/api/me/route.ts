import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401 }
    )
  }


  const userId = Number(session.user.id);

  const { data: user, error } = await supabase
    .from("User")
    .select(`
        id,
        roleId,
        fullName,
        username,
        email,
        address,
        schoolId,
        role: Role (
          name
        ),
        school: School (
          name,
          slug,
          address
        )
      `)
    .eq("id", userId)
    .single();

  if (error) throw error;
  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }


  return Response.json(user)
}
