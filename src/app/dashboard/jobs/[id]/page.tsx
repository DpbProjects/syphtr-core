import { fetchJobById } from "@/utils/data";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await fetchJobById(Number(params.id));

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
