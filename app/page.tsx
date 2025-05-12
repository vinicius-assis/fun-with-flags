import { Card, Footer, Grid, Header } from "./components";

const countries = [
  {
    id: 1,
    country: "Brazil",
    capital: "Brasília",
    region: "South America",
    population: "214000000",
  },
  {
    id: 2,
    country: "Japan",
    capital: "Tokyo",
    region: "Asia",
    population: "125800000",
  },
  {
    id: 3,
    country: "Argentina",
    capital: "Buenos Aires",
    region: "South America",
    population: "46000000",
  },
  {
    id: 4,
    country: "Germany",
    capital: "Berlin",
    region: "Europe",
    population: "83000000",
  },
  {
    id: 5,
    country: "Australia",
    capital: "Canberra",
    region: "Oceania",
    population: "26000000",
  },
  {
    id: 6,
    country: "Canada",
    capital: "Ottawa",
    region: "North America",
    population: "39000000",
  },
  {
    id: 7,
    country: "India",
    capital: "New Delhi",
    region: "Asia",
    population: "1410000000",
  },
  {
    id: 8,
    country: "Egypt",
    capital: "Cairo",
    region: "Africa",
    population: "110000000",
  },
  {
    id: 9,
    country: "France",
    capital: "Paris",
    region: "Europe",
    population: "68000000",
  },
  {
    id: 10,
    country: "South Africa",
    capital: "Pretoria",
    region: "Africa",
    population: "60000000",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Grid>
          {countries.map(({ id, country, capital, region, population }) => (
            <Card
              key={id}
              country={country}
              capital={capital}
              region={region}
              population={population}
            />
          ))}
        </Grid>
      </main>
      <Footer />
    </>
  );
}
