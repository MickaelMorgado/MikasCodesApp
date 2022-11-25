import styled from "styled-components";

export const StyledPlayer = styled.div`

  position: relative;
  margin-top: 20px;

  & > * {
    padding-top: 0 !important
  }

  video {
    width: 500px;
    max-width: 100%;
  }

  .video-react-big-play-button {
    position: absolute;
    top: 0;
    display: none;
  }

  .video-react-control-bar {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;

    height: 30px;
    background: #111;
    padding: 5px;
    border-radius: 3px;
    color: grey;
    width: 500px;
    max-width: 100%;
    overflow: hidden;
  }
`;
