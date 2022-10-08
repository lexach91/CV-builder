import { Helmet } from 'react-helmet';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ title, content, children }) => {
  return (
	<div className='flex flex-col h-screen justify-between bg-slate-800 min-h-full'>
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={content} />
		</Helmet>
		<Navbar />
		<div className='flex flex-col justify-start content-start text-slate-100 flex-1 bg-slate-800'>
      {children}
    </div>
    <Footer />
	</div>
  );
};

export default Layout;