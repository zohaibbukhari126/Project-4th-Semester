import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 2em;
  color: #343a40;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  padding: 20px;
  width: 90%;
  max-width: 600px;
  text-align: center;
`;

const VideoTitle = styled.h2`
  font-size: 1.5em;
  color: #495057;
  margin-bottom: 15px;
`;

const VideoFrame = styled.iframe`
  width: 100%;
  height: 315px;
  border: none;
  border-radius: 8px;
`;

const UserVideo = () => {
  // Define video URLs
  const videoUrls = {
    overweight: 'https://www.youtube.com/embed/ymjNF6lPUaY',
    underweight: 'https://www.youtube.com/embed/KM3ko1Z4amA',
    normal: 'https://www.youtube.com/embed/eMjyvIQbn9M'
  };

  return (
    <Container>
      <Title>Video</Title>
      
      {/* Display all videos */}
      <Card>
        <VideoTitle>Overweight</VideoTitle>
        <VideoFrame
          title="Overweight Video"
          src={videoUrls.overweight}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></VideoFrame>
      </Card>
      <Card>
        <VideoTitle>Underweight</VideoTitle>
        <VideoFrame
          title="Underweight Video"
          src={videoUrls.underweight}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></VideoFrame>
      </Card>
      <Card>
        <VideoTitle>Normal</VideoTitle>
        <VideoFrame
          title="Normal Video"
          src={videoUrls.normal}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></VideoFrame>
      </Card>
    </Container>
  );
};

export default UserVideo;
