import { css } from '@emotion/react';
import { ResponsiveStyle } from './Responsive';
import Button from './Button';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, onLogout }: any) => {
    return (
        <>
            <div css={HeaderStyle}>
                <div css={ResponsiveStyle}> 
                    <div css={Wrapperstyle}>
                        <Link to='/' className='logo'>
                            REACTERS
                        </Link>
                        {user ? (
                            <div className='right'>
                                <div css={UserInfoStyle}>
                                    {user.username}                                
                                </div>
                                <div onClick={onLogout}>
                                <Button>로그아웃</Button>
                                </div>
                            </div>
                        ) : (
                        <Link to='/login' className='right'>
                            <Button>로그인</Button>
                        </Link>
                        )}                        
                    </div>
                </div>
            </div>
            <div css={SpacerStyle} />
        </>
    );
}

export default Header;

const UserInfoStyle = css`
    font-weight: 800;
    margin-right: 1rem;
    padding-top: 1.5rem;
    padding-bottom: 0.5rem;
`
const HeaderStyle = css`
    position: fixed;
    width: 100%;
    background: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapperstyle = css`
    height: 4rem;
    display: flex;
    align-items: center;
    /* 자식 엘리멘트 사이의 여백을 최대로 설정 */
    justify-content: space-between; 
    .logo {
        font-size: 1.125rem;
        font-weight: 800;
        letter-spacing: 2px;
    }

    .right {
        display: flex;
        align-items: center;
    }
`;

const SpacerStyle = css`
    height: 4rem;
`

