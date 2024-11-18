import React from 'react';
import { TfiMenu  } from "react-icons/tfi";

function AdminHeader() {
    return (
        <header className='navbar sticky-top bg-primary flex-md-nowrap p-0 shadow' data-bs-theme='dark'>
            <a className='navbar-brand col-md-3 col-lg-2 me-0 p-3 fs-6 text-white fw-bold d-flex align-items-center' href='/'>
                <TfiMenu />
                <span className='mx-2'>Evergreen Dashboard</span>
            </a>
            {/* <form className='d-flex mx-4 d-none d-md-flex' role='search'>
                <input className='form-control me-2' type='search' placeholder='Search' aria-label='Search' />
                <button className='btn btn-primary' type='submit'>Search</button>
            </form> */}
        </header>
    )
}

export default AdminHeader;