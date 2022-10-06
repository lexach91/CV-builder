import Layout from "../components/Layout";


const HomePage = () => {
  return (
    <Layout title='Home' content='Welcome to the home page'>
      <div className="bg-yellow-300 pt-4 container mx-auto">
        <h1 className="text-6xl text-center my-6">
          Home Page
        </h1>
        <p  className="xl text-center">
          Here goes the home page
        </p>
      </div>
    </Layout>
  );
}

export default HomePage;