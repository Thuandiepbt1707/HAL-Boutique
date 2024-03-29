

import Slide from './Sliders'
import Collections from './Collection'
import HotProducts from './HotProducts'
import NewProductList from './NewProductList'
import './Homepage.scss'

const Homepage = ()=>{
    return(
        <main className="homepage">
            <h2 className='header-title title1'> - Bộ sưu tập đáng chú ý -</h2>
            <Slide />
            <Collections />
            <HotProducts />
            <NewProductList />
        </main>
    )
}

export default Homepage;