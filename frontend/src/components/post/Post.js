import Image from "next/image";

export default function Post(props) {
  const { post } = props;
  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-1 lg:px-4">
      <div className="bg-white rounded-lg shadow-lg w-full">
        <div
          dangerouslySetInnerHTML={{ __html: post.text }}
          className="text-left"
        ></div>
        {post.images && post.images.length > 0 && (
          <div className="flex flex-row flex-wrap justify-center items-center w-full h-full space-x-2">
            <Image src={post.images[0]} alt="post" width={200} height={200} />
            <Image src={post.images[1]} alt="post" width={200} height={200} />
            <Image src={post.images[2]} alt="post" width={200} height={200} />
          </div>
        )}
        {post.video && (
          <video src={post.video} controls className="w-full h-full"></video>
        )}
        {post.audio && (
          <audio src={post.audio} controls className="w-full h-full"></audio>
        )}
        {post.document && (
          <a href={post.document} target="_blank" className="text-blue-500">
            Document
          </a>
        )}
        {post.poll && (
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-semibold">{post.poll.question}</h1>
            <div className="flex flex-col gap-1">
              {post.poll.options.map((option, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row justify-between items-center w-full"
                  >
                    <p>{option.text}</p>
                    <p>{option.votes}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
