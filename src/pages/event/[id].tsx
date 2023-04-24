import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { EventPage } from "~/components/eventpage";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

const SingleEventPage: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.events.getById.useQuery({
    id,
  });
  if (!data) return <div>404 Event Not Found</div>;

  return (
    <>
      <Head>
        <title>{`${data.event.name} - @${data.author.username}`}</title>
      </Head>
      <EventPage {...data} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");

  await ssg.events.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default SingleEventPage;
