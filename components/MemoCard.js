"use client";

import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export default function MemoCard({ item }) {
  const timeAgo = formatDistanceToNow(new Date(item.created_at), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <div className="flex flex-col justify-between flex-shrink-0 w-80 bg-white mr-5 px-6 pt-6 pb-8">
      <div>
        <div className="flex justify-between text-sm text-gray-500 mb-3">
          <span>{item.username}</span>
          <span>{timeAgo}</span>
        </div>

        {/* 본문: 리뷰 제목, 내용 */}
        <h3 className="font-bold text-primary truncate mb-2">
          {item.review_title}
        </h3>
        <p className="text-gray-800 h-36 text-sm overflow-hidden text-ellipsis ...">
          {item.review_content}
        </p>
      </div>

      <div className="flex justify-between items-center pt-4">
        <div className="flex gap-4 text-gray-600">
          <span className="flex items-center gap-1">
            <Image src={"/likelogo.svg"} width={16} height={16} alt="좋아요" />
            {item.like_count}
          </span>
          <span className="flex items-center gap-1">
            <Image src={"/commentlogo.svg"} width={16} height={16} alt="댓글" />
            {item.comment_count}
          </span>
        </div>
        <div className="text-right text-sm text-gray-800 w-1/2 truncate">
          <div>{item.play_author}</div>
          <div className="text-primary">『{item.play_title}』</div>
        </div>
      </div>
    </div>
  );
}
