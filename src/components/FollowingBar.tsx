"use client";

import useSWR from "swr";

export default function FollowingBar() {
  const { data, isLoading, error } = useSWR("/api/me");
  console.log(data);

  // 3. 백엔드에서 사용자의 상세 정보를 sanity에서 가지고 옮 (followings)

  // 4. 여기에서, 클라이언트 컴포넌트에서 followings 정보를 ui에 보여줌 (iamge, username)
  return <div>FollowingBar</div>;
}
