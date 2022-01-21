import React, { memo, ReactElement } from 'react';

import styled from '@emotion/styled';

import { Group } from '@/models/group';

import RecruitPost from './RecruitPost';

interface Props {
  groups: Group[];
}

function RecruitPosts({ groups }: Props): ReactElement {
  return (
    <RecruitPostsWrapper>
      {groups.map((group) => (
        <RecruitPost
          key={group.groupId}
          group={group}
        />
      ))}
    </RecruitPostsWrapper>
  );
}

export default memo(RecruitPosts);

const RecruitPostsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
