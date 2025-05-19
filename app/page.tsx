"use client";
import { useEffect, useState } from "react";
import { countriesApi } from "./services";
import Link from "next/link";
import { Card, Grid, Search } from "./components";

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
  const [search, setSearch] = useState("");
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      const [response, error] = await countriesApi.getAll();
      setLoading(false);
      if (error) {
        setError(error);
        return;
      }
      setCountries(response);
    };

    fetchCountries();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error?.toString()}</div>;

  const sortedCountries = countries.sort((a, b) =>
    a.name.common.localeCompare(b.name.common, "en-US")
  );

  const filteredCountries = sortedCountries.filter(({ name }) =>
    name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="mb-8">
        <Search
          count={filteredCountries.length}
          search={search}
          setSearch={setSearch}
        />
      </div>
      <Grid>
        {filteredCountries.map(
          ({ cca3: id, name, capital, region, population, flags }, idx) => (
            <Link key={id} href={`/country/${id}`}>
              <Card
                index={idx}
                name={name.common}
                capital={capital?.[0] ?? ""}
                region={region}
                population={population}
                flagData={flags}
              />
            </Link>
          )
        )}
      </Grid>
    </>
  );
}
