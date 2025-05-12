"use client";
import { useEffect, useState } from "react";
import { Card, Footer, Grid, Header } from "./components";

type CountriesProps = {
  cca3: string;
  flags: {
    svg: string;
    alt: string;
  };
  name: {
    common: string;
  };
  capital: string[];
  region: string;
  population: number;
};

export default function Home() {
  const [countries, setCountries] = useState<CountriesProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=cca3,name,capital,region,population,flags"
        );
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error?.toString()}</div>;

  return (
    <>
      <Header />
      <main className="flex-1">
        <Grid>
          {countries.map(
            ({ cca3: id, name, capital, region, population, flags }, idx) => (
              <Card
                index={idx}
                key={id}
                name={name.common}
                capital={capital?.[0] ?? ""}
                region={region}
                population={population.toString()}
                flagData={flags}
              />
            )
          )}
        </Grid>
      </main>
      <Footer />
    </>
  );
}
