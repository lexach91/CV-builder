import Layout from "../components/Layout";


const HomePage = () => {
  return (
    <Layout title='Home' content='Welcome to the home page'>
      <div className="pt-4 container mx-auto">
        <h1 className="text-6xl text-center my-6 text-emerald-400 ">
          Home Page
        </h1>
        <p  className="text-xl text-center">
          Here goes the home page
        </p>
      </div>
    </Layout>
  );
}

export default HomePage;