import { useEffect, useState } from "react";
import type { Product } from "./types/Product";
import { ListProductsUseCase } from "./api/ListProductsUseCase";
import { SearchProductsUseCase } from "./api/SearchProductsUseCase";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let canceled = false;

    if (searchText.trim() === "") {
      async function loadAll() {
        const data = await new ListProductsUseCase().handle();
        if (!canceled) setProducts(data);
      }
      loadAll();
      return () => {
        canceled = true;
      };
    }

    const timeoutId = setTimeout(() => {
      async function search() {
        try {
          const data = await new SearchProductsUseCase().handle(searchText);
          if (!canceled) {
            setProducts(data);
          }
        } catch (error) {
          console.log("Error to search products", error);
        }
      }
      search();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      canceled = true;
    };
  }, [searchText]);

  return (
    <div>
      <h1>Catálogo de Produtos</h1>
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Quer buscar o que bobão?"
      />

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} — {p.category} — R$ {p.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
