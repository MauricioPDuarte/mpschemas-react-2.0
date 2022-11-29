import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface IToastProps {
  type?: 'success' | 'error' | 'info';
}

const toastTypeVariations = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
    border-left: 4px solid #3172b7;
  `,

  success: css`
    background: #e6fffa;
    color: #2e656a;
    border-left: 4px solid #2e656a;
  `,

  error: css`
    background: #fddede;
    color: #c53030;
    border-left: 4px solid #c53030;
  `,
};

export const Container = styled(animated.div)<IToastProps>`
  width: 380px;
  position: relative;
  padding: 16px 20px;
  border-radius: 4px 0 0 4px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  & + div {
    margin-top: 8px;
  }
  ${(props) => toastTypeVariations[props.type || 'info']}
  > svg {
    margin: 0 16px 0 0;
  }
  div {
    flex: 1;
    p {
      margin-top: 3px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }
  button {
    opacity: 0.6;
    background: transparent;
    color: inherit;
    margin: 4px 0 0 10px;
  }
`;