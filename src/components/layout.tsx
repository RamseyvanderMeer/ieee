import type { PropsWithChildren } from "react";
import { Nav } from "~/components/nav";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="relative h-full">
      <div className="sticky top-0 left-0 w-screen z-50">
        <Nav />
      </div>
      <div className="flex h-full w-full flex-col">{props.children}</div>
    </main>
  );
};
