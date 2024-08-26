// query string
interface PageProps {
  searchParams: {
    q?: string;
  };
}

const Page: React.FC<PageProps> = ({ searchParams }) => {
  console.log(searchParams);

  return <div>search</div>;
};

export default Page;
