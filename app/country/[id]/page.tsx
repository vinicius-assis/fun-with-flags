type CountryProps = {
  params: Promise<{ id: string }>;
};

export default async function Country({ params }: CountryProps) {
  const id = (await params).id;
  return <span>Country page: {id}</span>;
}
