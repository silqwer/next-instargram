"use client";

import useSWR from "swr";

export default function FollowingBar() {
  const { data, isLoading, error } = useSWR("/api/hello");
  console.log(data);

  // 1. 클라이언트 컴포넌트에서 백엔드에게 api/me를 통해서 사용자의 정보를 받아옴

  // 2. 백엔드에서는 현재 로그인된 사용자의 세션 정보를 이용해서

  // 3. 백엔드에서 사용자의 상세 정보를 sanity에서 가지고 옮 (followings)

  // 4. 여기에서, 클라이언트 컴포넌트에서 followings 정보를 ui에 보여줌 (iamge, username)
  return <div>FollowingBar</div>;
}
