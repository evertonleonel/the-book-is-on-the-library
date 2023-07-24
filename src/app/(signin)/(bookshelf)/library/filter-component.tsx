import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGenres } from "@/hooks/use-genres";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Select } from "@radix-ui/react-select";

interface FilterSearch {
  handleFilterData: (value: string, name: string) => void;
  searchDateOrGenre: () => void;
  clearFields: () => void;
  filterBooks: { genre: string; createdAt: string; searchText: string };
}

const FilterComponent = ({
  handleFilterData,
  searchDateOrGenre,
  clearFields,
  filterBooks,
}: FilterSearch) => {
  const { genre, defaultGenres } = useGenres();

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
            onValueChange={(e) => handleFilterData(e, "genre")}
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
            name="createdAt"
            type="date"
            value={filterBooks.createdAt}
            onChange={(e) => handleFilterData(e.target.value, "createdAt")}
            className="w-full my-4"
            placeholder="filtrar"
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="flex justify-between w-full">
          <Button onClick={clearFields} variant={"secondary"}>
            Limpar
          </Button>
          <Button onClick={searchDateOrGenre}>Buscar</Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterComponent;
