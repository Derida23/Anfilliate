import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const options = [
  { value: "1", label: "Default" },
  { value: "2", label: "1-50" },
  { value: "3", label: "51-100" },
  { value: "4", label: "101- 150" },
]

const categorys = [
  { value: "shoes", label: "Sepatu" },
  { value: "jacket", label: "Jaket" },
  { value: "pants", label: "Celana" },
  { value: "shirt", label: "Baju" },
]

const site ={
  name: 'Anfilliate',
  description: 'Unlock Exclusive Deals with Our Product Affiliate Program',
}

export default function Home() {
  return (
    <main className="max-w-xl mx-auto">
      <section id="header">
        <div className="relative">
          <div className="absolute left-0 bottom-16">
            <div>
              <div className="text-white w-fit bg-slate-800/50 pl-3 pr-5 py-2 font-medium text-2xl flex items-end gap-x-1">
                <img src="/images/shoes.webp" alt="shoes" className="w-10" />
                <p className="mb-[1px]">
                  {site.name}
                </p>
              </div>
              <p className="text-white text-xs pl-2 italic pt-2">{site.description}</p>
            </div>

          </div>
          <img src="/images/hero.webp" alt="logo" className=" h-48 w-full object-cover object-bottom" />
        </div>
        <div className="grid grid-cols-3 px-5 gap-x-2 mt-[-20px]">
          <div className="relative col-span-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <Input
              type="text"
              className="pl-10"
              placeholder="Cari produk"
            />
          </div>
          <div className="relative">
            <Select >
              <SelectTrigger className="w-full h-full bg-white">
                <SelectValue placeholder="Nomor" />
              </SelectTrigger>
              <SelectContent>
                {
                  options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>

          </div>
        </div>
      </section>

      <section id="category" className="flex items-center justify-center gap-x-2 lg:gap-x-5 mt-4 mx-auto max-w-xl">
        {
          categorys.map((category) => (
            <div key={category.value} className="w-24 h-24 lg:w-28 lg:h-28 shadow-xl rounded-lg border border-gray-100 cursor-pointer hover:shadow-2xl">
              <div className="flex items-center justify-center">
                <img src={`/images/category/${category.value}.webp`} alt={category.value} className="w-20 h-20 " />
              </div>
              <p className="text-xs text-center -mt-1 font-semibold">{category.label}</p>
            </div>
          ))
        }
      </section>


    </main>
  );
}
