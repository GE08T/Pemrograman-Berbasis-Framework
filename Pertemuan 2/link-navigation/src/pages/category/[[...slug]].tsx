import { useRouter } from "next/router";

const CategoryPage = () => {
  const { query } = useRouter();
  const slug = query.slug;
  
  return (
    <div>
      <h1>Halaman Category</h1>
      {Array.isArray(slug) ? (
        <ul>
          {slug.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>undefined</p>
      )}
    </div>
  );
}

export default CategoryPage;