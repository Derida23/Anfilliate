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
      product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) &&
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
    <main className="landing">
      <section id="header">
        <div className="relative">
          <div className="landing-company">
            <section>
              <div className="landing-company-hero">
                <img src="/images/shoes.webp" alt="shoes" className="w-10" />
                <p className="mb-[1px]">
                  {site.name}
                </p>
              </div>
              <p className="landing-company-description">{site.description}</p>
            </section>

          </div>
          <img src="/images/hero.webp" alt="logo" className="landing-company-background" />
        </div>
      </section>

      <section
        id="filter"
        className={`landing-filter ${isSticky ? 'landing-filter-sticky' : ''}`}
      >
        <div className="landing-filter-search">
          <div className="search">
            <SearchIcon className="search-icon" />
          </div>
          <Input
            type="text"
            className="pl-10"
            placeholder="Cari produk"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="landing-filter-select">
          <div className="select">
            <Select onValueChange={setSelectedRange} value={selectedRange}>
              <SelectTrigger className="select-label">
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
          <div
            onClick={() => { setSearchTerm(''), setSelectedCategory(''), setSelectedRange('all') }}
            className="reset">
            <ListRestart />
          </div>
        </div>
      </section>

      <section id="category" className="landing-category">
        {
          categories.map((category) => (
            <div onClick={() => setSelectedCategory(category.value)} key={category.value} className={`category ${selectedCategory === category.value ? 'bg-orange-50' : 'bg-white'}`}>
              <div className="category-image">
                <img src={`/images/category/${category.value}.webp`} alt={category.value} className="w-20 h-20 " />
              </div>
              <p className="category-title">{category.label}</p>
            </div>
          ))
        }
      </section>

      <section id="product" className="landing-product">
        {filteredProducts.length === 0 ? (
          <div className="landing-product-empty">
            <img src="/images/empty.webp" alt="empty" className="landing-product-empty-image" />
            <p className="landing-product-empty-title">Produk tidak ditemukan</p>
          </div>
        ) : (
          <div className="landing-product-container">
            {filteredProducts.map((item) => (
              <div key={item.no} className="landing-product-wrapper">
                <div className="landing-product-badge">
                  <Badge>{item.no}</Badge>
                </div>
                <div className="landing-product-image">
                  <img src={item.image}
                    onError={handleError} alt="product" className="" />
                </div>
                <div className="w-full pt-2">
                  <p className="landing-product-name">{item.name}</p>
                  <p className="landing-product-price">Rp. {toMoney(item.price)}</p>
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
