import React from "react";

const Review = ({ review }) => {
  const { name, title, videoId } = review;

  return (
    <div className="relative group w-full max-w-xl mx-auto">
      <div className="relative aspect-[9/16] w-full rounded-3xl overflow-hidden bg-black shadow-2xl hover:shadow-4xl transition-all duration-500 transform hover:scale-[1.02]">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&modestbranding=1&rel=0&showinfo=0&controls=1&fs=1&cc_load_policy=0&iv_load_policy=3`}
          title={`Testimonio de ${name}`}
          className="w-full h-full rounded-3xl"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none">
          <h3 className="text-2xl font-bold text-white drop-shadow-2xl mb-2">{name}</h3>
          <p className="text-white/95 text-lg drop-shadow-lg font-medium">{title}</p>
        </div>
        
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-white text-sm font-medium">Video</span>
        </div>
      </div>
    </div>
  );
};

export default Review;
