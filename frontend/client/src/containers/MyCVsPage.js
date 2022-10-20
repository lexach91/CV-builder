import Layout from "../components/Layout";


const MyCVsPage = () => {
  return (
    <Layout title='CV-builder | My CVs' content='Welcome to the Your CVs page'>
      <div className="pt-4 container mx-auto">
        <h1 className="text-6xl text-center my-6 text-emerald-400 ">
          All CVs Page
        </h1>
        <p  className="text-xl text-center">
          Here goes the CVs Page
        </p>
      </div>
    </Layout>
  );
}

export default MyCVsPage;