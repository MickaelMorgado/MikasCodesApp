import React from "react";
import { Player } from 'video-react';

import * as S from "./styles";

export interface IVideoPlayerProps {
  src: string;
}

export const VideoPlayer = ({
  src
}: IVideoPlayerProps) => {
  return (
    <>
      <S.StyledPlayer>
        <Player src={src} />
      </S.StyledPlayer>
    </>
  );
};

export default VideoPlayer;
