import styled from 'styled-components';

export const AppLoaderIcon = styled.div`
  display: flex;
  align-items: center;
  color: red;

  @keyframes anim-opacity {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  & > * {
    opacity: 1;
    animation-name: anim-opacity;
    animation-duration: 0.8s;
    animation-iteration-count: infinite;
  }

  & > *:nth-child(2) {
    animation-delay: 0.1s;
  }
  & > *:nth-child(3) {
    animation-delay: 0.2s;
  }
`;
