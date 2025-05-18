"use client";
import { useEffect, useState } from "react";
import { countriesApi } from "@/app/services";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

type Params = {
  id: string;
};

type DetailCountry = {
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
  languages: Record<string, string>;
  currencies: Record<string, { name: string; symbol: string }>;
  tld: string[];
  borders: string[];
};

export default function Country() {
  const params = useParams<Params>();

  const [id, setId] = useState<string | null>();
  const [country, setCountry] = useState<DetailCountry>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (params?.id && params.id !== id) {
      setId(params.id);
    }
  }, [params, id]);

  useEffect(() => {
    if (!id) return;

    const fetchCountries = async () => {
      const [response, error] = await countriesApi.getCountry(id);
      setLoading(false);
      if (error) {
        setError(error);
        return;
      }
      setCountry(response);
    };

    fetchCountries();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error?.toString()}</div>;

  const {
    flags,
    name,
    capital,
    region,
    population,
    languages,
    currencies,
    tld,
    borders,
  } = country ?? {};

  const { svg: flag, alt } = flags ?? {};
  const { common: countryName } = name ?? {};
  const [capitalName] = capital ?? [];
  const languagesNames = Object.values(languages ?? {}).join(" ");
  const currenciesNames = Object.values(currencies ?? {})
    .map(({ name, symbol }) => `${name} (${symbol})`)
    .join(", ");
  const [topLevelDomain] = tld ?? [];
  const bordersIds = borders ?? [];

  return (
    <>
      <div className="mb-8">
        <Link href="/">
          <button className="bg-gray-200 hover:bg-gray-300 font-semibold py-2 px-4 rounded cursor-pointer">
            Back
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
        <div className="flex items-center md:max-w-[400px]">
          <Image
            src={flag ?? "/flag-placeholder.svg"}
            alt={alt || "Placeholder"}
            className="max-h-80 object-cover rounded-lg"
            width={500}
            height={300}
            priority
          />
        </div>
        <div className="flex flex-col justify-center p-6 text-sm text-gray-600">
          <h2 className="text-xl font-semibold mb-4">
            {countryName} ({id})
          </h2>
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Capital:</span> {capitalName}
            </div>
            <div>
              <span className="font-semibold">Região:</span> {region}
            </div>
            <div>
              <span className="font-semibold">Population:</span> {population}
            </div>
            <div>
              <span className="font-semibold">Languages:</span> {languagesNames}
            </div>
            <div>
              <span className="font-semibold">Currencies:</span>{" "}
              {currenciesNames}
            </div>
            <div>
              <span className="font-semibold">Top Level Domain:</span>{" "}
              {topLevelDomain}
            </div>
            <div className="md:max-w-80">
              <span className="font-semibold">Borders:</span>{" "}
              {bordersIds.length
                ? bordersIds.map((bordersId) => (
                    <Link key={bordersId} href={`/country/${bordersId}`}>
                      <button className="bg-gray-200 hover:bg-gray-300 mb-[6px] px-[6px] py-[1.5px] mr-[6px] text-xs rounded cursor-pointer">
                        {bordersId}
                      </button>
                    </Link>
                  ))
                : "None"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
