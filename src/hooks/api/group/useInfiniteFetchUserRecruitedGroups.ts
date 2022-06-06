import { useEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

import { FirestoreError } from 'firebase/firestore';

import { InfiniteRequest, InfiniteResponse } from '@/models';
import { Group } from '@/models/group';
import { getInfiniteUserRecruitedGroups } from '@/services/api/group';
import { checkEmpty } from '@/utils/utils';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

interface UserRecruitedGroupsRequest extends InfiniteRequest {
  userUid?: string;
}

function useInfiniteFetchUserRecruitedGroups({ userUid, perPage }: UserRecruitedGroupsRequest) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    root: wrapperRef.current,
    rootMargin: '50px',
  });

  const query = useInfiniteQuery<InfiniteResponse<Group>, FirestoreError>(
    ['recruitedGroups', { userUid, perPage }],
    ({ pageParam }) => getInfiniteUserRecruitedGroups(userUid as string, {
      perPage,
      lastUid: pageParam,
    }),
    {
      getNextPageParam: ({ lastUid }) => lastUid,
      enabled: !!userUid && !!perPage,
    },
  );

  const {
    error, isError, hasNextPage, fetchNextPage,
  } = query;

  useCatchFirestoreErrorWithToast({
    error,
    isError,
    defaultErrorMessage: '모집한 팀을 불러오는데 실패했어요!',
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return useMemo(() => ({
    query: {
      ...query,
      data: {
        ...query.data,
        pages: checkEmpty(query.data?.pages),
      },
    },
    refState: {
      lastItemRef: ref,
      wrapperRef,
    },
  }), [query, ref, wrapperRef]);
}

export default useInfiniteFetchUserRecruitedGroups;
