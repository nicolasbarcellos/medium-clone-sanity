import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import PortableText from "react-portable-text";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post as PostType } from "../../typings";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface PostProps {
  post: PostType;
}

interface FormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

export default function Post({ post }: PostProps) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const router = useRouter();
  if (router.isFallback) return <p>Loading...</p>;

  const onSubmit: SubmitHandler<FormInput> = (data, e) => {
    e.preventDefault();

    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((data) => {
        console.log(data);
        setSubmitted(true);
      })

      .catch((err) => {
        console.log(err.message);
        setSubmitted(false);
      });
  };

  return (
    <>
      <Header />

      <main>
        <article className="max-w-2xl px-4 md:px-0 mx-auto">
          <h1 className="text-4xl mt-10 mb-1 text-stone-800">{post.title}</h1>
          <h2 className="text-xl font-light text-gray-500 mb-2">
            {post.description}
          </h2>
          <div className="flex items-center space-x-2">
            <div className="relative h-10 w-10 shrink-0">
              <Image
                className="object-cover rounded-full "
                src={urlFor(post.author.image).url()}
                layout="fill"
                alt={post.title}
              />
            </div>
            <p className="font-extralight text-sm">
              Blog post by{" "}
              <span className="text-green-600">{post.author.name} </span> -
              Published at {new Date(post._createdAt).toLocaleString("pt-br")}
            </p>
          </div>
          <div className="relative w-full h-72 x sm:h-96 my-10">
            <Image
              priority
              objectFit="cover"
              layout="fill"
              src={urlFor(post.mainImage).url()}
              alt={post.title}
            />
          </div>
          <div className="mt-10">
            <PortableText
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
              content={post.body}
              serializers={{
                h1: (props: any) => (
                  <h1
                    className="text-2xl text-stone-800 font-bold my-5"
                    {...props}
                  />
                ),
                h2: (props: any) => (
                  <h1 className="text-xl font-bold my-5" {...props} />
                ),
                li: ({ children }: any) => (
                  <li className="text-2xl font-bold my-5">{children}</li>
                ),
                link: ({ href, children }: any) => (
                  <a href={href} className="text-blue-500 hover:underline">
                    {children}
                  </a>
                ),
                normal: (props: any) => (
                  <p className="text-stone-700 text-xl leading-9" {...props} />
                ),
              }}
            ></PortableText>
          </div>
        </article>

        <hr className="max-w-lg  px-4 md:px-0 mx-auto border-2 mt-4 border-media-blue" />

        {!submitted ? (
          <>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex  px-4 md:px-0 flex-col my-10 mx-auto max-w-2xl"
            >
              <h3 className="text-media-blue font-extrabold text-lg">
                Enjoyed this article?
              </h3>
              <h4 className="text-xl text-slate-900 font-bold">
                Leave a comment below!
              </h4>
              <hr className="py-3 mt-2" />

              <input
                {...register("_id")}
                type="hidden"
                name="_id"
                value={post._id}
              />

              <label className="block mb-5">
                <span className="text-gray-800">Name</span>
                <input
                  className="shadow border rounded py-2 px-3 mt-1 block w-full 
     ring-media-blue outline-none focus:ring"
                  placeholder="Enter your name"
                  type="text"
                  {...register("name", {
                    required: true,
                    maxLength: 20,
                  })}
                />
              </label>
              <label className="block mb-5">
                <span className="text-gray-800">Email</span>
                <input
                  className="shadow border rounded py-2 px-3 mt-1 block w-full 
     ring-media-blue outline-none focus:ring"
                  placeholder="Enter your email"
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                  })}
                />
              </label>
              <label className="block mb-5">
                <span className="text-gray-800">Comment</span>
                <textarea
                  className="shadow border rounded py-2 px-3 mt-1 block w-full 
     ring-media-blue outline-none focus:ring"
                  placeholder="Enter your comment"
                  rows={8}
                  {...register("comment", {
                    required: true,
                  })}
                ></textarea>
              </label>

              <div className="flex flex-col p-5">
                {errors.name && (
                  <span className="text-red-500">
                    - The name field is required
                  </span>
                )}
                {errors.email && (
                  <span className="text-red-500">
                    - The email field is required
                  </span>
                )}
                {errors.comment && (
                  <span className="text-red-500">
                    - The comment field is required
                  </span>
                )}
              </div>

              <button
                className="border-0 bg-media-blue w-full font-bold 
 text-stone-900 h-12 hover:opacity-90 transition-opacity 
 duration-300"
                type="submit"
              >
                Submit
              </button>
            </form>
            <div
              className="flex flex-col my-10 max-w-2xl mx-auto
           shadow-media-blue p-10 shadow space-y-2"
            >
              <h3 className="text-xl font-extrabold">Comments</h3>
              <hr className="pb-2" />
              {post.comments.map((comment) => (
                <div key={comment._id}>
                  <p>
                    <span className="text-media-blue">{comment.name}:</span>{" "}
                    {comment.comment}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div
            className="flex flex-col py-10 my-10 
          text-stone-900 mx-auto max-w-2xl px-4 md:px-0"
          >
            <div className="bg-media-blue p-4">
              <h3 className="text-2xl md:text-3xl font-bold">
                Thank your for submitting your comment!
              </h3>
              <p>Once it has been approved, it will appear below!</p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "post"]{
    slug {
      current
    }
  }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: PostType) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const query = `*[_type == "post" && slug.current == $slug][0]{
   _id,
   _createdAt,
   title,
   author-> {
     name,
     image
   },
   description,
   mainImage,
   slug,
   body,
   'comments': *[
     _type == "comment" && 
     post._ref == ^._id &&
     approved == true],
  }`;

  const post = await sanityClient.fetch(query, {
    slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 3600, // 60 min
  };
};
