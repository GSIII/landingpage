"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import MemoCard from "@/components/MemoCard";

export default function Memo() {
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getFeed() {
      setLoading(true);
      const { data, error } = await supabase
        .from("memo")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) console.error("Error fetching feed:", error);
      else if (data) setFeedItems(data);
      setLoading(false);
    }
    getFeed();
  }, []);

  if (loading) {
    return <div className="h-64 bg-white" />;
  }

  return (
    <div className="overflow-hidden">
      <div className="flex animate-marquee-fast hover:[animation-play-state:paused]">
        {feedItems.map((item) => (
          <MemoCard key={item.id} item={item} />
        ))}

        {feedItems.map((item) => (
          <MemoCard key={`${item.id}-dup`} item={item} />
        ))}
      </div>
    </div>
  );
}
