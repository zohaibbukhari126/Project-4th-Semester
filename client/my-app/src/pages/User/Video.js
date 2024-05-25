import React from 'react';

const UserVideo = () => {
  // Define video URLs
  const videoUrls = {
    overweight: 'https://www.youtube.com/embed/ymjNF6lPUaY',
    underweight: 'https://www.youtube.com/embed/KM3ko1Z4amA',
    normal: 'https://www.youtube.com/embed/eMjyvIQbn9M'
  };

  return (
    <div>
      <h1>Video</h1>
      
      {/* Display all videos */}
      <div>
        <h2>Overweight</h2>
        <iframe
          title="Overweight Video"
          width="560"
          height="315"
          src={videoUrls.overweight}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div>
        <h2>Underweight</h2>
        <iframe
          title="Underweight Video"
          width="560"
          height="315"
          src={videoUrls.underweight}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div>
        <h2>Normal</h2>
        <iframe
          title="Normal Video"
          width="560"
          height="315"
          src={videoUrls.normal}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default UserVideo;
