import Layout from "../components/Layout";


const CreateCVPage = () => {
  return (
    <Layout title='CV-builder | My CVs' content='Welcome to the Create CV page'>
      <div className="pt-4 container mx-auto">
        <h1 className="text-6xl text-center my-6 text-emerald-400 ">
          Create New CV
        </h1>
        <p  className="text-xl text-center">
          Here goes the create CV Page
        </p>
      </div>
    </Layout>
  );
}

export default CreateCVPage;