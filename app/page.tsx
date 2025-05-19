"use client";
import { useEffect, useState } from "react";
import { countriesApi } from "./services";
import Link from "next/link";
import { Card, Grid, Search, Select } from "./components";

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
  const [selected, setSelected] = useState("All regions");
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

  const regions = [...new Set(countries.map(({ region }) => region))];

  const sortedCountries = countries.sort((a, b) =>
    a.name.common.localeCompare(b.name.common, "en-US")
  );

  const filteredCountries = sortedCountries.filter(({ name, region }) => {
    const nameMatches = name.common
      .toLowerCase()
      .includes(search.toLowerCase());
    const regionMatches = selected === "All regions" || region === selected;

    return nameMatches && regionMatches;
  });

  return (
    <>
      <div className="flex justify-between mb-8">
        <Search
          count={filteredCountries.length}
          search={search}
          setSearch={setSearch}
        />
        <Select
          options={regions}
          selected={selected}
          setSelected={setSelected}
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
