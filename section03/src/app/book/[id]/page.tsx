// path variable
interface PageProps {
  params: {
    id?: string | string[];
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  return <div>book {params.id}</div>;
};

export default Page;
