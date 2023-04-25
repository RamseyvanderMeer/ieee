import { type NextPage } from "next";

import { Landing } from "~/components/landing";
import {Contact} from "~/components/contact";

const Home: NextPage = () => {
  //   const { isLoaded: userLoaded } = useUser();

  // Start fetching asap
  //   api.posts.getAll.useQuery();

  // Return empty div if user isn't loaded
  //   if (!userLoaded) return <div />;

  return (
    <div>
        <Landing />
        <div>
              <h1 className="text-4xl text-center">About</h1>
              <h1 className="text-4xl text-center">Events</h1>
        </div>
        <Contact />
    </div>
  );
};

export default Home;
