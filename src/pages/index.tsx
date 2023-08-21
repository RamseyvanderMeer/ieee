import { type NextPage } from "next";

import { Landing } from "~/components/landing";
import { Contact } from "~/components/contact";
import { AboutSection } from "~/components/aboutsection";
// import { Event } from "~/components/event";
import { CalendarComponent } from "~/components/CalendarComponent";
import { SponsorSlides } from "~/components/sponsorslides";

const Home: NextPage = () => {
  //   const { isLoaded: userLoaded } = useUser();

  // Start fetching asap
  //   api.posts.getAll.useQuery();

  // Return empty div if user isn't loaded
  //   if (!userLoaded) return <div />;

  return (
    <div>
      <Landing />
      <AboutSection />
          {/* <Event /> */}
        <CalendarComponent />
      {/* <SponsorSlides /> */}
      <Contact />
    </div>
  );
};

export default Home;
