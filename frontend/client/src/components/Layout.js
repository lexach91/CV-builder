import { Helmet } from 'react-helmet';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ title, content, children }) => (
	<div className='flex flex-col h-screen justify-between bg-gray-100'>
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={content} />
		</Helmet>
		<Navbar />
		<div className='flex flex-col justify-start content-start flex-1 bg-green-500'>
      {children}
    </div>
    <Footer />
	</div>
);

export default Layout;