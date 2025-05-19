"use client";
import { useEffect, useState } from "react";
import { countriesApi } from "@/services";
import Link from "next/link";
import { Card, Grid, Error, Loading, Search, Select } from "@/components";

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
  const [error, setError] = useState<string>("");

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

  if (loading) return <Loading text="Discovering countries..." />;
  if (error) return <Error text={error} />;

  const regions = [
    "All regions",
    ...new Set(countries.map(({ region }) => region)),
  ];

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
      <div className="flex flex-col-reverse md:flex-row gap-4 justify-between mb-8">
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
