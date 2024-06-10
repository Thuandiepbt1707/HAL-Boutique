
import { useState, useEffect } from 'react';
import { hotProductsList } from '../../services/products.api';
import Productcard from '../../components/ProductCard';
import './homepageStyle/HotProducts.scss'

const HotProducts = () => {
    const [hotProd, setHotProd] = useState([]);
    console.log(hotProd)
    useEffect(()=>{
        async function getHotProd (){
            setHotProd(await hotProductsList());
        }
        getHotProd()
    },[])
    return(
        <section className="hotproducts">
            <h2 className="section-title">Sản phẩm nổi bật</h2>
            <div className="hotproducts_list">
                {
                    hotProd.map((product, index)=>{
                        return(
                            <Productcard id={product} key={index}/>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default HotProducts;