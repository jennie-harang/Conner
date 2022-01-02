import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import DropDown from './DropDown';

describe('DropDown', () => {
  const handleSignOut = jest.fn();

  const renderDropDown = () => render((
    <DropDown
      name="test"
      email="test@test.com"
      isVisible={given.isVisible}
      signOut={handleSignOut}
    />
  ));

  context('isVisible이 true인 경우', () => {
    given('isVisible', () => true);

    describe('로그아웃 버튼을 클릭한다', () => {
      it('로그아웃 이벤트가 호출되어야만 한다', () => {
        renderDropDown();

        fireEvent.click(screen.getByText('로그아웃'));

        expect(handleSignOut).toBeCalledTimes(1);
      });
    });
  });

  context('isVisible이 false인 경우', () => {
    given('isVisible', () => false);

    it('아무것도 렌더링 되지 않아야 한다', () => {
      const { container } = renderDropDown();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
