import { type NextPage } from "next";

import { Landing } from "~/components/landing";
import { Contact } from "~/components/contact";
import { About } from "~/components/about";
import { Event } from "~/components/event"

const Home: NextPage = () => {
  //   const { isLoaded: userLoaded } = useUser();

  // Start fetching asap
  //   api.posts.getAll.useQuery();

  // Return empty div if user isn't loaded
  //   if (!userLoaded) return <div />;

  return (
    <div>
        <Landing />
              <About />
<Event />
        <Contact />
    </div>
  );
};

export default Home;
