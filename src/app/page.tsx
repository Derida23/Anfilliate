"use client"
import { useEffect, useState } from "react";
import { products } from "@/libs/constants";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, ListRestart, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const options =
  [
    { value: 'all', label: 'All' },
    { value: '001-005', label: '1-5' },
    { value: '006-010', label: '6-10' },
    { value: '011-015', label: '11-15' },
    { value: '016-020', label: '16-20' },
    // Add more ranges as needed
  ];


const categories = [
  { value: "shoes", label: "Sepatu" },
  { value: "jacket", label: "Jaket" },
  { value: "pants", label: "Celana" },
  { value: "shirt", label: "Baju" },
]

const site = {
  name: 'Anfilliate',
  description: 'Unlock Exclusive Deals with Our Product Affiliate Program',
}

function useDebounce(value: string, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}


export default function Home() {

  const handleError = (e: any) => {
    e.target.src = '/images/shoes.webp';
  };


  function toMoney(amount: number) {
    return new Intl.NumberFormat('en-US', {
    }).format(amount)
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRange, setSelectedRange] = useState('all');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const isInRange = (productNo: string) => {
    if (selectedRange === 'all') return true;

    const [start, end] = selectedRange.split('-').map(Number);
    const productNumber = Number(productNo);

    return productNumber >= start && productNumber <= end;
  };

  const filteredProducts = products
    .filter(product =>
      (selectedCategory === '' || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())  &&
      isInRange(product.no)
    );


  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 180);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Optional for smooth scrolling
    });
  };

  return (
    <main className="max-w-xl mx-auto relative">
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
      </section>

      <div
        className={`sticky top-0 z-10 grid grid-cols-3 px-2 gap-x-2 mt-[-20px] transition-all duration-300 ${isSticky ? 'bg-white shadow-md py-2' : ''}`}
      >
        <div className="relative col-span-2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </div>
          <Input
            type="text"
            className="pl-10"
            placeholder="Cari produk"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative grid grid-cols-4 gap-x-1">
          <div className="col-span-3">
            <Select onValueChange={setSelectedRange} value={selectedRange}>
              <SelectTrigger className="w-full h-full bg-white">
                <SelectValue placeholder="Nomor" />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div onClick={() => { setSearchTerm(''), setSelectedCategory(''), setSelectedRange('all') }} className="cursor-pointer hover:bg-gray-50 bg-white rounded-sm h-full flex items-center justify-center border-[1px] border-gray-100">
            <ListRestart />
          </div>
        </div>
      </div>

      <section id="category" className="flex items-center justify-center gap-x-2 lg:gap-x-5 mt-4 mx-auto max-w-xl">
        {
          categories.map((category) => (
            <div onClick={() => setSelectedCategory(category.value)} key={category.value} className={`w-24 h-24 lg:w-28 lg:h-28 shadow-xl rounded-lg border border-gray-100 cursor-pointer hover:shadow-2xl ${selectedCategory === category.value ? 'bg-orange-50' : 'bg-white'}`}>
              <div className="flex items-center justify-center">
                <img src={`/images/category/${category.value}.webp`} alt={category.value} className="w-20 h-20 " />
              </div>
              <p className="text-xs text-center -mt-1 font-semibold mb-1">{category.label}</p>
            </div>
          ))
        }
      </section>

      <section id="product" className="mt-5 p-2 bg-stone-100 rounded-lg">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-10 h-96">
            <img src="/images/empty.webp" alt="empty" className="w-52 h-52 mx-auto" />
            <p className="text-gray-500 text-xl font-semibold mt-10">Produk tidak ditemukan</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-2 gap-y-4">
            {filteredProducts.map((item) => (
              <div key={item.no} className="relative border rounded-lg bg-white p-2">
                <div className="absolute top-3 left-3">
                  <Badge>{item.no}</Badge>
                </div>
                <div className="flex justify-center min-w-32 min-h-32">
                  <img src={item.image}
                    onError={handleError} alt="logo" className="w-full rounded-t-lg object-cover" />
                </div>
                <div className="w-full pt-2">
                  <p className="font-semibold text-sm max-h-20 line-clamp-2">{item.name}</p>
                  <p className="text-orange-400 font-semibold mt-1">Rp. {toMoney(item.price)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className='scroll-button'>
        <button onClick={scrollToTop} >
          <ChevronUp />
        </button>
      </div>
    </main>
  );
}
