import { css } from '@emotion/react';
import React from 'react';
import palette from '../../lib/styles/palette';

type buttonProps = {
  cyan?: boolean;
  fullWidth?: boolean;
  children: string;
  style?: any;
};

const Button = ({ cyan, fullWidth, children }: buttonProps) => {
  const fullWidhStyle = css`
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    width: 100%;
    font-size: 1.125rem;
  `;

  const cyanStyle = css`
    background: ${palette.cyan[500]};
    &:hover {
      boackground: ${palette.cyan[400]};
    }
  `;

  const buttonStyle = css`
      
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      padding; 0.25rem, 1rem;    
      color: white;
      outline: none;
      cursor: pointer;
      margin: 1rem 0 0 0    ;

      background: ${palette.grey[800]};
      &:hover {
          background: ${palette.grey[600]};
      }
      ${fullWidth && fullWidhStyle}          
      ${cyan && cyanStyle}
  `;

  return <button css={buttonStyle}>{children}</button>;
};

export default Button;
