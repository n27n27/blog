import { css } from '@emotion/react';

type responsiveProps = {
    children: any
}

const Responsive = ({ children, ...rest }: responsiveProps) => {
    return (
        <div css={ResponsiveStyle}>{children}</div>
    );
}

export default Responsive;

export const ResponsiveStyle = css`
    padding-left: 1rem;
    padding-right: 1rem;
    width: 1024px;
    margin: 0 auto;

    @media(max-width: 1024px) {
        width: 768px;
    }

    @media(max-width: 768px) {
        width: 100%;
    }
`;