import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

type textMapType = {
  [index: string] : string
  login: string
  register: string
}

const textMap: textMapType = {
    login: '로그인',
    register: '회원가입'
};

type authFormProps = {
  type: string
}
const AuthForm = ({ type }: authFormProps) => {
    const text = textMap[type];
  return (
    <div css={AuthformStyle}>
      <h3>{text}</h3>
      <form>
        <input
          css={inputStyle}
          autoComplete="username"
          name="username"
          placeholder="아이디"
        />
        <input
          css={inputStyle}
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
        />
        {type === 'register' && (
            <input
                css={inputStyle}
                autoComplete='new-password'
                name='passwordConfirm'
                placeholder='비밀번호 확인'
                type='password'
            />
        )}
        <Button cyan fullWidth>
          {text}
        </Button>
      </form>
      <div css={footerStyle}>
          {type === 'login' ? (
              <Link to="/register">회원가입</Link>
          ) : (
            <Link to="/login">로그인</Link>
          )}        
      </div>
    </div>
  );
};

export default AuthForm;

const AuthformStyle = css`
  h3 {
    margin: 0;
    color: ${palette.grey[800]};
    margin-bottom: 1rem;
  }
`;

const inputStyle = css`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.grey[500]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.grey[700]};
  }

  & + & {
    margin-top: 1rem;
  }
`;

const footerStyle = css`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.grey[600]};
    text-decoration: underline;
    &: hover {
      color: ${palette.grey[900]};
    }
  }
`;
