import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="max-w-xl mx-auto">
      <section>
        <div className="relative">
          <div className="absolute left-0 bottom-16">
            <div>
              <div className="text-white w-fit bg-slate-800/50 pl-3 pr-5 py-2 font-medium text-2xl flex items-end gap-x-1">
                <img src="/images/shoes.webp" alt="shoes" className="w-10" />
                <p className="mb-[1px]">
                  Anfilliate
                </p>
              </div>
              <p className="text-white text-xs pl-2 italic pt-2">Unlock Exclusive Deals with Our Product Affiliate Program</p>
            </div>

          </div>
          <img src="/images/hero.webp" alt="logo" className=" h-48 w-full object-cover object-bottom" />
        </div>
        <div className="w-full px-5 mt-[-20px]">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <Input
              type="text"
              className="pl-10"
              placeholder="Search"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
