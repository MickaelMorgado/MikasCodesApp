import styled from 'styled-components';

const bgOpacity = '22';

export const appColor = {
  red: {
    c1: '#FF5533',
    c2: `#FF5533${bgOpacity}`,
  },
  orange: {
    c1: '#FF9D00',
    c2: `#FF9D00${bgOpacity}`,
  },
  blue: {
    c1: '#55AAFF',
    c2: `#55AAFF${bgOpacity}`,
  },
  black: {
    c1: '#FFF',
    c2: `#000000${bgOpacity}`,
  },
  purple: {
    c1: '#0AA',
    c2: `#00AAAA${bgOpacity}`,
  },
  pink: {
    c1: '#F0F',
    c2: `#FF00FF${bgOpacity}`,
  },
};

export const Tag = styled.span`
  padding: 3px 5px;
  border-radius: 3px;
  font-style: normal;
`;

export const Terminal = styled(Tag as 'span')`
  color: ${appColor.black.c1};
  background-color: ${appColor.black.c2};
`;

export const TerminalColor = styled.span`
  color: ${appColor.black.c1};
`;

export const Git = styled(Tag as 'span')`
  color: ${appColor.purple.c1};
  background-color: ${appColor.purple.c2};
`;

export const GitColor = styled.span`
  color: ${appColor.purple.c1};
`;

export const React = styled(Tag as 'span')`
  color: ${appColor.blue.c1};
  background-color: ${appColor.blue.c2};
`;

export const ReactColor = styled.span`
  color: ${appColor.blue.c1};
`;

export const Flutter = styled(Tag as 'span')`
  color: ${appColor.pink.c1};
  background-color: ${appColor.pink.c2};
`;

export const FlutterColor = styled.span`
  color: ${appColor.pink.c1};
`;

export const BrowserDevTool = styled(Tag as 'span')`
  color: ${appColor.orange.c1};
  background-color: ${appColor.orange.c2};
`;

export const BrowserDevToolColor = styled.span`
  color: ${appColor.orange.c1};
`;

export const Js = styled(Tag as 'span')`
  color: ${appColor.red.c1};
  background-color: ${appColor.red.c2};
`;

export const JsColor = styled.span`
  color: ${appColor.red.c1};
`;
