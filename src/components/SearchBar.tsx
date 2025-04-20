
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (searchTerm: string) => void;
  isRTL?: boolean;
}

const SearchBar = ({ 
  placeholder = 'Search artifacts, exhibitions, and more...',
  onSearch,
  isRTL = false
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={`search-bar ${isRTL ? 'rtl' : ''}`}
    >
      <Search className="w-5 h-5 text-muted-foreground mr-2" />
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="border-0 focus-visible:ring-0 bg-transparent flex-1 text-foreground"
      />
      <Button type="submit" variant="ghost" size="sm" className="text-primary">
        {isRTL ? 'بحث' : 'Search'}
      </Button>
    </form>
  );
};

export default SearchBar;
