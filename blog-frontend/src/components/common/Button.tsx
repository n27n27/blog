import { css } from '@emotion/react';
import palette from '../../lib/styles/palette';
import React from 'react';

const Button = (props: any) => {
    return (
        <button css={buttonStyle}>{props.children}</button>
    );
}

export default Button;

const buttonStyle = css`
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    padding; 0.25rem, 1rem;    
    color: white;
    outline: none;
    cursor: pointer;

    background: ${palette.grey[800]};
    &:hover {
        background: ${palette.grey[600]};
    }    
`;
