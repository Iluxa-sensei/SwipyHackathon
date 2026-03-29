import { redirect } from "next/navigation";

export default function ParentIndexPage() {
  redirect("/dashboard/parent/overview");
}
