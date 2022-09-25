/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, {
  FormEvent, KeyboardEvent, PropsWithChildren, ReactElement, ReactNode,
} from 'react';
import { X as CloseSvg } from 'react-feather';
import { useLockBodyScroll } from 'react-use';

import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import useResponsive from '@/hooks/useResponsive';
import { h4Font } from '@/styles/fontStyles';
import mq from '@/styles/responsive';
import transitions from '@/styles/transitions';
import zIndexes from '@/styles/zIndexes';

import type { ColorType as ButtonColorType } from './Button';
import Button from './Button';

interface Props {
  isVisible: boolean;
  title: ReactNode;
  confirmText?: string;
  closeText?: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  size?: string;
  confirmButtonColor?: ButtonColorType;
  isDisabledConfirmButton?: boolean;
}

function FormModal({
  isVisible,
  title,
  confirmText = '확인',
  closeText = '닫기',
  onSubmit,
  onClose,
  confirmButtonColor = 'success',
  isDisabledConfirmButton = false,
  size = '600px',
  children,
}: PropsWithChildren<Props>): ReactElement | null {
  const theme = useTheme();
  const { isClient, isMobile } = useResponsive();

  const isClientDesktop = isClient && !isMobile;
  const checkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => e.code === 'Enter' && e.preventDefault();

  useLockBodyScroll(isClientDesktop && isVisible);

  if (!isVisible) {
    return null;
  }

  return (
    <FormModalWrapper>
      <FormModalBox size={size} isVisible={isVisible} data-testid="form-modal-box">
        <StyledForm onSubmit={onSubmit} onKeyDown={checkKeyDown}>
          <HeaderWrapper>
            <h4>{title}</h4>
            <CloseIcon
              size={24}
              color={theme.accent6}
              onClick={onClose}
              data-testid="close-icon"
            />
          </HeaderWrapper>
          {children}
          <FooterWrapper>
            {isClientDesktop && (
              <Button size="small" onClick={onClose} type="button">{closeText}</Button>
            )}
            <SubmitButton
              size={isClientDesktop ? 'small' : 'large'}
              color={confirmButtonColor}
              type="submit"
              data-testid="apply-button"
              disabled={isDisabledConfirmButton}
            >
              {confirmText}
            </SubmitButton>
          </FooterWrapper>
        </StyledForm>
      </FormModalBox>
    </FormModalWrapper>
  );
}

export default FormModal;

const StyledForm = styled.form`
  height: 100%;
`;

const FormModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${zIndexes.FormModal};
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
`;

const FormModalBox = styled.div<{ size: string; isVisible: boolean; }>`
  ${({ size }) => mq({
    width: ['100%', size],
    height: ['100%', 'auto'],
    borderRadius: ['0px', '8px'],
    boxShadow: ['none', '0 2px 12px 0 rgb(0 0 0 / 9%)'],
  })};

  background: ${({ theme }) => theme.background};

  ${({ isVisible }) => (isVisible && css`
    animation: ${transitions.popInFromBottom} 0.4s forwards ease-in-out;
  `)};
`;

const HeaderWrapper = styled.div`
  ${mq({
    padding: ['14px 20px 14px 20px', '16px 20px 12px 20px'],
    marginBottom: ['0', '20px'],
  })};

  position: relative;
  z-index: ${zIndexes.FormModal};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 1px 0px ${({ theme }) => theme.accent2};

  h4 {
    ${h4Font(true)};
    margin: 0px;
    display: inline-flex;

    & > span {
      word-break: break-all;
      overflow-wrap: break-word;
      text-overflow: ellipsis;
      display: -webkit-inline-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`;

const CloseIcon = styled(CloseSvg)`
  cursor: pointer;
  min-width: 24px;
  min-height: 24px;
  margin-left: 24px;
`;

const FooterWrapper = styled.div`
  ${({ theme }) => mq({
    boxShadow: ['none', `inset 0px 1px 0px ${theme.accent2}`],
    padding: ['0px', '16px 16px 16px 20px'],
    position: ['fixed', 'initial'],
    bottom: ['20px', 'initial'],
    width: ['100%', 'initial'],
  })};

  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SubmitButton = styled(Button)`
  ${mq({
    width: ['100%', 'initial'],
    margin: ['0 20px', '0'],
  })}
`;
