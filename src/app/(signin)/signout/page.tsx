import { LogOutButtons } from "@/components/auth/logout-buttons";

export default function SignOutPage() {
  return (
    <div className="mx-auto mb-16 mt-20 max-w-md justify-center">
      <p className="mb-4">Tem certeza que deseja sair?</p>
      <div className="max-w-xs">
        <LogOutButtons />
      </div>
    </div>
  );
}
