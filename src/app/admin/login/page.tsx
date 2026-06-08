import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#080807] px-4 text-[#f8f4ea]">
      <div className="w-full max-w-md">
        <AdminLoginForm />
      </div>
    </div>
  );
}
