export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 bg-secondary m-6 rounded-md shadow-2xl flex flex-col justify-center items-center relative">
      {children}
    </main>
  );
}
