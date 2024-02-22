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
} from "./components";
import Sort from "./components/customs/Sort/Sort";
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
import { Column, TProduct } from "./lib/typings/Typings";
import useDatabase from "./hooks/useDatabase";
import { useEffect } from "react";
import { DB_LOCATION } from "./lib/loc/loc";

const App = () => {
  const { data, getData, loading } = useDatabase();

  useEffect(() => {
    getData(DB_LOCATION.products);
  }, []);

  return (
    <div className="w-full px-8 py-4 relative">
      {/* HEADER */}
      <Header />

      <div className="mx-4 mt-2 border rounded-md">
        {/* Filter / Sort / Search */}
        <Grid className="py-8 px-4 border-b gap-4 justify-items-end">
          <div className="w-full">
            <Search
              placeholder="Search for a product"
              className="!w-[60%] [&>input]:placeholder:font-montserrat"
            />
          </div>
          <Flex variant="centered" className="gap-2 w-fit">
            <Sort />
            <Filter />
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
