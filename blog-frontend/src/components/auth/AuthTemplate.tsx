import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import palette from "../../lib/styles/palette";

const AuthTemplate = ({ children }: any) => {

    return (
        <div css={AuthTemplateStyle}>
            <div css={WhiteBox}>
                <div className="logo-area">
                    <Link to='/'>REACTERS</Link>
                </div>
            {children}
            </div>
        </div>

    );

};

export default AuthTemplate;

const AuthTemplateStyle = css`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: ${palette.grey[200]};
    // flex로 내부 중앙 정렬
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

// 흰색 박스
const WhiteBox = css`
    .logo-area {
        display: block;
        padding-bottom: 2rem;
        text-align: center;
        font-weight: bold;
        letter-spacing: 2px;
    }
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
    padding: 2rem;
    width: 360px;
    background: white;
    border-radius: 2px;
`;
