import { css } from '@emotion/react';

export const FOCUS_BACKGROUND = (props: any) => css`
  transition: background 0.1s ease;
  &:focus-visible {
    background: ${props.theme.background.transparent.light};
  }
`;
