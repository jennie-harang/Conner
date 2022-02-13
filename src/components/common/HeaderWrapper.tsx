import React, { memo, PropsWithChildren, ReactElement } from 'react';

import styled from '@emotion/styled';
import Link from 'next/link';

import Layout from '@/styles/Layout';
import palette from '@/styles/palette';
import zIndexes from '@/styles/zIndexes';

import LogoSvg from '../../assets/icons/img_logo_conners.svg';

interface Props {
  hasBackground: boolean;
  isScrollTop: boolean;
  testId?: string;
}

function HeaderWrapper({
  hasBackground, isScrollTop, testId, children,
}: PropsWithChildren<Props>):ReactElement {
  return (
    <>
      <HeaderBlock hasBackground={hasBackground} isScrollTop={isScrollTop} data-testid={testId}>
        <HeaderContents>
          <Link href="/" passHref>
            <a>
              <LogoIcon />
            </a>
          </Link>
          {children}
        </HeaderContents>
      </HeaderBlock>
      <Spacer />
    </>
  );
}

export default memo(HeaderWrapper);

const LogoIcon = styled(LogoSvg)`
  width: 96px;
  height: 24px;
`;

const HeaderBlock = styled.div<{ hasBackground: boolean; isScrollTop: boolean }>`
  position: fixed;
  width: 100%;
  z-index: ${zIndexes.TopNavigation};
  background: ${({ hasBackground }) => (hasBackground ? palette.accent1 : palette.background)};
  box-shadow: 0 1px 0 0 ${({ isScrollTop }) => (isScrollTop ? 'transparent' : palette.accent2)};
  transition: box-shadow .2s ease-in-out;
`;

const Spacer = styled.div`
  height: 4rem;
`;

const HeaderContents = styled(Layout)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;