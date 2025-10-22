"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { programmeImageUrl } from "@/lib/storage";
import Memo from "@/components/Memo";
import ResultModal from "@/components/ResultModal";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setIsLoading(true);
    setIsModalOpen(true);
    setResults([]);
    try {
      const { data, error } = await supabase
        .from("memo")
        .select("*")
        .or(
          `play_title.ilike.%${searchTerm}%, play_author.ilike.%${searchTerm}%`
        );

      if (error) throw error;
      setResults(data || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
      setSearchTerm("");
    }
  };

  return (
    <main>
      <nav className="fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Image src="/logo.svg" alt="로고" width={160} height={35} />
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-700">
              <a href="#">희곡 DB</a>
              <a href="#">작가 DB</a>
              <a href="#">멤버십</a>
              <a href="#" className="flex items-center">
                프로그램
              </a>
              <a href="#" className="flex items-center">
                커뮤니티
              </a>
              <a href="#">인스크립트</a>
              <a href="#">문의</a>
            </div>
            <div className="flex items-center space-x-4 text-gray-500 text-xl">
              <a href="#" aria-label="링크">
                🔗
              </a>
              <a href="#" aria-label="메일">
                ✉️
              </a>
              <a href="#" aria-label="유저">
                👤
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="h-screen relative">
        <Image
          src={"/herosection.png"}
          alt="메인 이미지"
          fill
          style={{ objectFit: "cover" }}
          priority={true}
        />
      </section>

      {/* Search section */}
      <section id="search" className="h-screen flex flex-col bg-secondary">
        <div className="w-full bg-primary text-[#DA8248] text-3xl flex items-center justify-center h-[76px]">
          A home for words and scripts. Spoken & Written, Together
        </div>

        <div className="flex-1 flex items-center justify-center px-6">
          <div className="flex flex-col items-center w-full">
            <Image src={"/book.svg"} alt="책" width={112} height={112} />

            <h2 className="text-3xl text-primary my-8">
              오늘 찾아볼 희곡은 무엇인가요?
            </h2>

            <form
              onSubmit={handleSearch}
              className="w-full max-w-xl p-5 border-b-2 border-primary flex justify-between items-center"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="희곡 제목 또는 작가명으로 검색하세요(예 : 아서 밀러, 갈라테아)"
                className="w-full bg-transparent text-[#B28B7A] placeholder:text-[#B28B7A] focus:outline-none"
              />
              <button type="submit" className="cursor-pointer">
                <Image
                  src={"/search.svg"}
                  alt="검색 아이콘"
                  width={24}
                  height={24}
                />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Memo Section */}
      <section id="memo" className="min-h-screen bg-secondary relative">
        <div className="bg-primary text-secondary relative z-10">
          <div className="mx-auto px-[120px] flex justify-between items-center h-[304px]">
            <div>
              <h2 className="text-3xl font-bold mb-2">지금 뜨는 메모</h2>
              <p className="text-gray-200">
                다른 유저가 남기고 간 메모를 발견해보세요
              </p>
            </div>
            <div className="text-6xl text-orange-700">Memo</div>
          </div>
        </div>
        <div className="relative z-20 mt-[-50px]">
          <Memo />
        </div>
      </section>

      {/* Programme Section */}
      <section id="programme" className="min-h-screen bg-secondary relative">
        <div className="bg-gradient-to-r from-white to-[#F8F1EA] relative z-10">
          <div className="mx-auto px-[120px] flex justify-between items-center h-[304px]">
            <div>
              <h2 className="text-primary text-3xl font-bold mb-2">
                지금 신청할 수 있는 프로그램
              </h2>
              <p className="text-[#2A2A2A]">인스크립트 프로그램에 참여하세요</p>
            </div>
            <div className="text-[#F4E4D6] text-6xl">Programme</div>
          </div>
        </div>
        <div className="relative z-20 mt-[-80px] overflow-hidden flex justify-center mb-[30px]">
          <Image
            src={programmeImageUrl}
            alt="이달의 프로그램"
            width={1207}
            height={300}
          />
        </div>
      </section>

      {isModalOpen && (
        <ResultModal
          isLoading={isLoading}
          results={results}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
}
