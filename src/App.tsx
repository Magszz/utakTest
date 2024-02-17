import { Header, Category, Flex, Grid, Product } from "./components";
import { CATEGORIES, MIN_PRODUCT_LENGTH } from "./lib/constant";

const App = () => {
  return (
    <div className="w-full">
      <div className="sticky top-0 bg-white p-4">
        <Header />

        <Flex
          variant="startCentered"
          className="gap-2 sticky top-0 my-5 w-full overflow-auto"
        >
          {CATEGORIES?.map((category: string, ind: number) => (
            <Category key={`category-${ind}`} name={category} />
          ))}
        </Flex>
      </div>

      <Grid
        className={`gap-2 p-4 ${
          4 < MIN_PRODUCT_LENGTH && "grid-cols xl:grid-cols-4"
        }`}
      >
        <Product />
        <Product />
        <Product />
        <Product />
      </Grid>
    </div>
  );
};

export default App;
