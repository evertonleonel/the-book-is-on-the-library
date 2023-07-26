import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { defaultGenres } from "@/config/site";
import { getAllBooks, getBook } from "@/lib/services";
import { GetBook } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Select } from "@radix-ui/react-select";
import { useEffect, useState } from "react";

type FilterProps = {
  setFilterGenre: React.Dispatch<React.SetStateAction<string>>;
  setFilterDate: React.Dispatch<React.SetStateAction<string>>;
  filterGenre: string;
  filterDate: string;
  applyFilter: VoidFunction;
  clearFilters: VoidFunction;
};

const FilterComponent = ({
  setFilterDate,
  setFilterGenre,
  filterDate,
  filterGenre,
  applyFilter,
  clearFilters,
}: FilterProps) => {
  const [genre, setGenre] = useState<String[]>([]);

  useEffect(() => {
    getAllBooks().then((data: GetBook[]) => {
      const genres = data.map((el) => {
        return el.genre;
      });

      const updatedGenresSet = new Set([...genres, ...defaultGenres]);

      // Converter o Set em  array
      const updatedGenres = Array.from(updatedGenresSet).sort();

      setGenre(updatedGenres);
    });
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-24 h-14 " variant="outline">
          Filtro
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-4 mt-2 bg-background shadow-lg rounded-md">
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Select
            name="genre"
            key={"genre"}
            value={filterGenre}
            onValueChange={(e) => setFilterGenre(e)}
          >
            <SelectTrigger className="my-4 bg-background">
              <SelectValue placeholder="Gênero" />
            </SelectTrigger>
            <SelectContent>
              {genre.length == 0
                ? defaultGenres.map((el, index) => {
                    return (
                      <SelectItem key={index} value={String(el)}>
                        {el}
                      </SelectItem>
                    );
                  })
                : genre.map((el, index) => {
                    return (
                      <SelectItem key={index} value={String(el)}>
                        {el}
                      </SelectItem>
                    );
                  })}
            </SelectContent>
          </Select>

          <Input
            name="systemEntryDate"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full my-4"
            placeholder="filtrar"
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="flex justify-between w-full">
          <Button onClick={clearFilters} variant={"secondary"}>
            Limpar
          </Button>
          <Button onClick={applyFilter}>Buscar</Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterComponent;
