import type { RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";

import relativeTime from "dayjs/plugin/relativeTime";
import toast from "react-hot-toast";
import { LoadingSpinner } from "./loading";
dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
export const PostView = (props: PostWithUser) => {
  const ctx = api.useContext();

  const { mutate, isLoading: isDeleting } =
    api.posts.deletePostsByPostId.useMutation({
      onSuccess: () => {
        void ctx.posts.getAll.invalidate();
      },
      onError: () => {
        toast.error("Failed to delete post! Please try again later.");
      },
    });

  const { post, author } = props;
  const { user } = useUser();
  return (
    <div key={post.id} className="flex gap-3 border-b border-slate-400 p-4">
      <Image
        src={author.profileImageUrl}
        className="h-14 w-14 rounded-full"
        alt={`@${author.username}'s profile picture`}
        width={56}
        height={56}
      />
      <div className="flex w-full flex-col">
        <div className="relative flex w-full gap-1 text-slate-300">
          <Link href={`/@${author.username}`}>
            <span>{`@${author.username} `}</span>
          </Link>
          <span className="font-thin">{` · ${dayjs(
            post.createdAt
          ).fromNow()}`}</span>
          {!isDeleting && user?.id === author.id && (
            <div
              className="absolute top-0 right-0"
              onClick={() => mutate({ id: post.id })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={25}
                height={25}
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                {" "}
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                  fill="white"
                ></path>{" "}
                <path
                  fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  fill="white"
                ></path>{" "}
              </svg>
            </div>
          )}
          {isDeleting && user?.id === author.id && (
            <div className="absolute top-0 right-0">
              <LoadingSpinner size={25} />
            </div>
          )}
        </div>
        <Link href={`/post/${post.id}`} className="text-2xl">
          {post.content}
        </Link>
      </div>
    </div>
  );
};
