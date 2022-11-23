import styled from 'styled-components';

export const Sidebar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 20px;
  min-width: 300px;
  background-color: #222;
  z-index: 1;
  transform: translateX(calc(-100% + 70px));
  transition: all .25s ease-out;
  box-shadow: 0 0 5px 0 black;
  
  &:hover {
    transform: translateX(0%);
    box-shadow: 0 0 300px -10px black;
  }
`;
