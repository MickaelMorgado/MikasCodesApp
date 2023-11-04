import styled from 'styled-components';
import { NodeCategory } from './flutter';

export const WrapperGeneratedCode = styled.textarea`
  border: 1px solid grey;
  border-radius: 5px;
  padding: 25px;
  color: grey;
  max-width: 100%;
  width: 100%;
  height: 500px;
  background: black;
`;

export const Visual = styled.div`
  position: relative;
  //border: 1px solid grey;
  border-radius: 5px;
  color: grey;
  max-width: 100%;
  width: 100%;
  height: 500px;
  background: #0a0a0a;
`;

export const Node = styled.div`
  position: absolute;
  display: inline-block;
  min-width: 150px;
  margin: 10px;
  color: white;
  border-radius: 5px;
  box-shadow: 0 0 30px -5px #222;
  font-size: 10px;
  background: black;
  overflow: hidden;
`;

export const NodeName = styled.div<{ category: NodeCategory }>`
  background: ${(props) => {
    switch (props.category) {
      case NodeCategory.FLUTTER:
        return 'Purple';
      default:
        return 'Grey';
    }
  }};
  padding: 5px 8px;
  font-weight: bold;
  color: white;
`;

export const NodeContent = styled.div`
  padding: 10px;
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;

export const NodeInputs = styled.div``;
export const NodeOutputs = styled.div``;

export const ContextMenu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 100%;
  font-size: 11px;
  background: #111;
  padding: 5px;
  border-radius: 5px;
  min-width: 125px;
  z-index: 1;

  & > div {
    cursor: pointer;
  }

  &:hover > div {
    opacity: 0.2;
  }
  & > div:hover {
    opacity: 1;
  }
`;

export const ContextMenuEntry = styled.div<{ category: NodeCategory }>`
  color: ${(props) => {
    switch (props.category) {
      case NodeCategory.FLUTTER:
        return 'Purple';
      case NodeCategory.JAVASCRIPT:
        return 'Red';
      default:
        return 'Grey';
    }
  }};
`;

export const NodePin = styled.div`
  display: inline-block;
  border-radius: 100%;
  width: 11px;
  height: 11px;
  background-color: grey;
  border: 2px solid #444;
  transform: translateY(3.5px);
  margin: 0 3px;
  cursor: pointer;
  transition: all 0.05s ease-in-out;

  &:hover {
    background: white;
    border: 2px solid #aaa;
    box-shadow: 0 0 10px white;
  }
`;

export const ConnectorsLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;

  & > svg {
    pointer-events: none;
  }
`;
