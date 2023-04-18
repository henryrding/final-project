import { useEffect, useState, Fragment } from 'react';
import { fetchCatalog } from '../lib';
import Card from "../components/Card";
import Search from "../components/Search";

export default function Catalog() {
  const [inventory, setInventory] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadCatalog() {
      try {
        const inventory = await fetchCatalog();
        setInventory(inventory);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadCatalog();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error Loading Catalog: {error.message}</div>;

  return (
    <div className="container">
      <Search />
      <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6">
        {inventory?.map((card) => (
          <Fragment key={card.inventoryId}>
            <Card card={card} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
