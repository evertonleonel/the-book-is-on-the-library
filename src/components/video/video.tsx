"use client";

export const VideoCubic = () => {
  return (
    <div className="container absolute">
      <video
        autoPlay
        loop
        className="dark:mix-blend-lighten translate-x-1/3 blur max-w-6xl h-full w-full"
        width="1024"
        height="1040"
      >
        <source src="/videos/cubic-video.mp4" />
      </video>
    </div>
  );
};
