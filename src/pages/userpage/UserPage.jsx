
import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { globalContext } from '../../context/globalContext'
import { updateUserInfor, requestOrderList } from '../../services/FakeAPI'
import './userpage.scss'

const UserPage = ()=>{
    const nav = useNavigate()
    const {feature} = useParams()
    const { userInfor, setUserInfor } = useContext(globalContext)
    const [ board, setBoard ] = useState()
    const [orderList, setOrderList] = useState(requestOrderList(userInfor?.username))
    const [ userData, setUserData ] = useState({
        "id": userInfor?.id,
        "username": userInfor?.username,
        "name": userInfor?.name,
        "sex": userInfor?.sex,
        "birthday": userInfor?.birthday,
        "email": userInfor?.email,
        "phoneNumber": userInfor?.phoneNumber,
        "address": userInfor?.address,
    })
    useEffect(()=>{
        setBoard(feature)
        window.scrollTo({top: '0', behavior: 'smooth'})
        if (!userInfor?.state) nav('/login')
    })
    console.log(orderList)
    const goToPath = (url)=>nav(url)

    const handleChangeUserData = (key, value) => {
        setUserData({...userData, [key]: value})
    }

    const handleSaveInfor = (e)=>{
        e.preventDefault()
        let response = updateUserInfor(userData)
        alert(response.message)
    }

    return(
        <main className="userpage">
            <aside className="sidebar">
                <div className="sidebar_avt">
                    <img src={userData?.avatar} alt="avt" className="sidebar_avt_img" />
                    <div className="sidebar_avt_username">
                        <p>{userData.username}</p>
                        <p onClick={()=>goToPath('/user/profile')} >Sửa hồ sơ</p>
                    </div>
                </div>
                <nav className="sidebar_nav">
                    <ul>
                        <li onClick={()=>goToPath('/user/profile')} >Tài khoản của tôi</li>
                        <ul className="sidebar_nav_list">
                            <li onClick={()=>goToPath('/user/profile')} >Hồ sơ</li>
                            <li>Ngân Hàng</li>
                            <li>Địa Chỉ</li>
                            <li>Đổi Mật Khẩu</li>
                            <li>Cài Đặt Thông Báo</li>
                            <li>Những  Thiết Lập Riêng Tư</li>
                        </ul>
                        <li onClick={()=>goToPath('/user/order')} >Đơn Mua</li>
                        <li>Thông báo</li>
                        <li>Kho Voucher</li>
                    </ul>
                </nav>
            </aside>
            <section className="board">
                {
                    board === 'profile' &&
                    <div className="profile">
                        <div className="profile_header">
                            <p>Hồ Sơ Của Tôi</p>
                            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                        </div>
                        <form className="profile_form" onSubmit={(e)=>handleSaveInfor(e)}>
                            <div className="label-list">
                                <label htmlFor="username">Tên đăng nhập</label>
                                <label htmlFor="name">Tên</label>
                                <label htmlFor="email">Email</label>
                                <label htmlFor="phone">Sô điện thoại</label>
                                <p htmlFor="sex">Giới tính</p>
                                <label htmlFor="birthday">Ngày sinh</label>
                            </div>
                            <div className="input-list">
                                <p>{userData.username}</p>
                                <input type="text" name="name" id="name" defaultValue={userData.name} onChange={(e)=>handleChangeUserData('name',e.target.value)} />
                                <input type="email" name="email" id="email" defaultValue={userData.email}/>
                                <input type="tel" name="phone" id="phone" defaultValue={userData.phoneNumber} required pattern="[0-9]{10}" onChange={(e)=>handleChangeUserData('phoneNumber',e.target.value)} />
                                <input type="date" name="birthday" id="birthday" defaultValue={userData.birthday} />
                                <div className="sex-options">
                                    <input type="radio" name="sex" id="male" checked={userData.sex == "male" ? true : false}  onChange={()=>handleChangeUserData('sex', 'male')}/>
                                    <label htmlFor="male"> Nam </label>
                                    <input type="radio" name="sex" id="female" checked={userData.sex == "female" ? true : false} onChange={()=>handleChangeUserData('sex', 'female')} />
                                    <label htmlFor="female"> Nữ </label>
                                    <input type="radio" name="sex" id="null" checked={userData.sex == null ? true : false} onChange={()=>handleChangeUserData('sex', null)} />
                                    <label htmlFor="null"> Khác </label>
                                </div>
                                <button className="infor_list_btn pointer">Lưu</button>
                            </div>
                            <div className="infor_avt">
                                <div className="infor_avt_img" style={{backgroundImage:userData?.avatar}}></div>
                                <input type="file" name="avt" id="avt" defaultValue={userData?.avatar} />
                                <label htmlFor="avt">Chọn Ảnh</label>
                                <p>Dung lượng file tối đa 1MB <br /> Định dạng: JPEG, PNG</p>
                            </div>
                        </form>
                    </div>
                }
                {
                    board === 'order' &&
                    <div className="order">
                        <p className="order_title">Danh sách đơn mua</p>
                        <div className="order_list">
                            {
                                orderList?.map((order, index) => {
                                    return (
                                        <div className="order_list_item" key={index}>
                                            <div className="order_list_item_header">
                                                <div></div>
                                                {
                                                    order.oderStatus === "complete" &&
                                                    <p>
                                                        <span className='state'> Giao hàng thành công </span>
                                                        <span className='oder-status'> Hoàn Thành </span>
                                                    </p>
                                                }
                                                {
                                                    order.oderStatus === "pending" &&
                                                    <p>
                                                        <span className='pending'> Đang xử lý </span>
                                                    </p>
                                                }
                                                {
                                                    order.oderStatus === "cancled" &&
                                                    <p>
                                                        <span className='cancled'> Đơn hàng đã bị huỷ </span>
                                                    </p>
                                                }
                                            </div>
                                            <div className="order_list_item_list">
                                                {
                                                    order.oderList.map((item, index) => {
                                                        return(
                                                            <div className='item'>
                                                                <img src={item.img[0]} className='pointer' alt="item" onClick={()=> goToPath(`/productdetail/${item.category}/${item.id}`)}/>
                                                                <p className="infor">
                                                                    <span>{item.title}</span>
                                                                    <span>Size: {item.size}</span>
                                                                    <span>Số lượng: x{item.quantity}</span>
                                                                    <span className='free'>Trả hàng miễn phí 15 ngày</span>
                                                                </p>
                                                                <p className='price'>{item.price.toLocaleString('it-IT', {style :"currency", currency : "VND"})}</p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className="order_list_item_footer">
                                                <p>
                                                    Thành tiền: { order.totalOder.toLocaleString('it-IT', {style :"currency", currency : "VND"})}
                                                </p>
                                                <div className="footer-btn">
                                                    {
                                                        order.oderStatus !== "pending" && <div className="btn bg-black" onClick={()=>handleReBuy()}>Mua lại</div>
                                                    }
                                                    {
                                                        order.oderStatus === "pending" && <div className="btn bg-black">Hủy đơn</div>
                                                    }
                                                    <div className="btn" onClick={()=> goToPath('/contacts')}>Liên hệ người bán</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </section>
        </main>
    )
}

export default UserPage;