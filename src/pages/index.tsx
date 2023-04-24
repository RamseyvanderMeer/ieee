import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import { Feed } from "~/components/feed";
import { CreatePostWizard } from "~/components/post";
import { Footer } from "~/components/footer";
import { Nav } from "~/components/nav";

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // Start fetching asap
  api.posts.getAll.useQuery();

  // Return empty div if user isn't loaded
  if (!userLoaded) return <div />;

  return (
    <PageLayout>
      {/* <div className="flex border-b border-slate-400 p-4">
        {!isSignedIn && (
          <div className="flex justify-center">
            <SignInButton />
          </div>
        )}
        {isSignedIn && <CreatePostWizard />}
          </div> */}

      {/* <Feed /> */}
          {/* <Footer /> */}
    </PageLayout>
  );
};

export default Home;
