import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../sanity";
import { Post } from "../typings";

interface PostsProps {
  posts: [Post];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <div className="py-10 container grid grid-cols-auto-fit md:gap-6 gap-3 ">
      {posts.map((post) => (
        <Link key={post._id} href={`/post/${post.slug.current}`} passHref>
          <div
            className="border rounded-lg group cursor-pointer
          overflow-hidden"
          >
            <div
              className="relative h-60 w-full 
            group-hover:scale-105 transition-transform duration-200 ease-in-out"
            >
              <Image
                src={urlFor(post.mainImage).url()}
                layout="fill"
                objectFit="cover"
                alt={post.title}
              ></Image>
            </div>

            <div
              className="flex justify-between
            bg-white p-5"
            >
              <div className="max-w-[80%]">
                <p className="text-md font-bold">{post.title}</p>
                <p className="text-xs">
                  {post.description} by {post.author.name}
                </p>
              </div>

              <div className="relative h-12 w-12 shrink-0">
                <Image
                  className="rounded-full"
                  src={urlFor(post.author.image).url()}
                  layout="fill"
                  objectFit="cover"
                  alt={post.author.name}
                ></Image>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
