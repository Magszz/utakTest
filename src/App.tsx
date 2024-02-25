/* eslint-disable react-hooks/exhaustive-deps */
import {
  Header,
  Flex,
  Search,
  Filter,
  Product,
  Grid,
  Empty,
  Loading,
  Sort,
} from "./components";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
} from "./components/ui/table";
import { Toaster } from "@/components/ui/toaster";
import { TABLE_COLUMNS } from "./lib/constant";
import { Column, Filter as TFilter, TProduct } from "./lib/typings/Typings";
import useDatabase from "./hooks/useDatabase";
import { ChangeEvent, useEffect, useState } from "react";
import { DB_LOCATION } from "./lib/loc/loc";
import _ from "lodash";
import { defaultFilterBy } from "./lib/static/defaultValues";

const App = () => {
  const [activeQuery, setActiveQuery] = useState<TFilter>({
    orderBy: "",
    equalTo: "",
  });
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState<string>("default");
  const { data, getData, loading } = useDatabase();

  useEffect(() => {
    getData(DB_LOCATION.products);
  }, []);

  // * SEARCH FOR PRODUCT
  const searchProduct = _.debounce((e: ChangeEvent<HTMLInputElement>) => {
    const filterBy = {
      orderBy: "productName",
      equalTo: e.target.value.toLowerCase(),
    };
    getData(DB_LOCATION.products, filterBy);
    setActiveQuery(filterBy);
  }, 250);

  // * FILTER BY CATEGORY OF PRODUCT
  const filterCategory = (val: string) => {
    const filterBy = {
      orderBy: "category",
      equalTo: val,
    };
    const filter = val === "all" ? defaultFilterBy : filterBy;
    setActiveQuery(filter);
    setFilter(val);
    getData(DB_LOCATION.products, filter);
  };

  // * SORT PRODUCTS
  const sortProducts = (val: string) => {
    getData(DB_LOCATION.products, activeQuery, val);
    setSort(val);
  };

  return (
    <div className="w-full px-8 py-4 relative">
      {/* HEADER */}
      <Header />

      <div className="mx-4 mt-2 border rounded-md">
        {/* Filter / Sort / Search */}
        <Grid className="py-8 px-4 border-b gap-4 justify-items-end">
          <div className="w-full">
            <Search
              onChange={searchProduct}
              placeholder="Search for a product"
              className="!w-[60%] [&>input]:placeholder:font-montserrat"
            />
          </div>
          <Flex variant="centered" className="gap-2 w-fit">
            <Sort value={sort} onValueChange={sortProducts} />
            <Filter value={filter} onValueChange={filterCategory} />
          </Flex>
        </Grid>

        {/* TABLE */}
        <div className="p-4 w-full">
          <Table className="w-full">
            <TableCaption className="mt-5 mb-3">
              Browse through our extensive selection of products, where you'll
              find a comprehensive list of all your items.
            </TableCaption>
            <TableHeader>
              <TableRow>
                {TABLE_COLUMNS?.map((column: Column, ind: number) => (
                  <TableHead key={`column-${ind}`} className={column.className}>
                    {column.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <Loading />
              ) : (
                <>
                  {!data.length ? (
                    <Empty />
                  ) : (
                    data?.map((product: TProduct, ind: number) => (
                      <Product {...product} key={`product-${ind}`} />
                    ))
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
