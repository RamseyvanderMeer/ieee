import type { PropsWithChildren } from "react";
import {Nav} from "~/components/nav";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="overflow-x-hidden felx-col flex justify-center">
          <div className="flex h-full w-full flex-col">
              <Nav />
        {props.children}
      </div>
    </main>
  );
};
