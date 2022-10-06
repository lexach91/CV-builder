const Navbar = () => {
  return (
    // set navbar to fixed-top in evergreen
    <div className='bg-red-500 w-full flex items-center justify-between flex-wrap p-6 fixed-top'>
      <div className='container'>
        <div className='navbar-brand' to='/'>
          logo
        </div>
      </div>
    </div>

  )

}

export default Navbar