import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LibraryPageLoading() {
  return (
    <>
      <div className="flex-1 grid gap-4 justify-center items-center w-full mb-4">
        <section className="flex-1 grid gap-4 justify-center items-center w-full mb-4">
          <div className="container flex items-center justify-center gap-4 h-14 lg:min-w-[800px]  w-full ">
            <div className="w-full flex justify-center items-center rounded-md border border-input bg-background  p-2 focus-within:ring-2 ring-offset-background ring-slate-400 dark:ring-slate-950">
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="container grid sm:grid-auto-fit-xs mt-10 place-items-center gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="h-full w-48 ">
                <CardHeader className="flex-1">
                  <Skeleton className="h-10 w-full" />
                </CardHeader>
                <CardContent className="mt-5">
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
