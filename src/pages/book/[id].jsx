import React from 'react'
import { useParams } from 'react-router-dom'
import FlashSaleBanner from '../../components/BookDetail.jsx/FlashSaleBanner'

export default function BookDetail() {
  const {id} = useParams()

  return (
    <main className='bg-gray-100 p-5 rounded'>
    <div className="flex rounded bg-white">
      <div className="image-all width:auto overflow:auto float-left ml-0">
        <div className="thumbnail inline-block w-52 float-left">
        <img className='w-3/12 h-3/12' src='https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_29246.jpg'/>
        <img className='w-3/12 h-3/12' src='https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_29246.jpg'/>
        <img className='w-3/12 h-3/12' src='https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_29246.jpg'/>
        </div>
        <div className="main-image inline-block">
          <img className='w-1/2 h-1/2' src='https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_29246.jpg'/>
        </div>
        <button></button>
      </div>

      <div className="book-detail p-2">
        <h1 className='text-3xl align-middle'>Nói sao cho trẻ nghe lời</h1>
        <div className="some-info float-left m-2 p-2">
          <div className="sa1">
            <div className="supplier inline">
              <span>Nhà cung cấp: </span>
              <span className='font-bold mr-5'>Minh Long</span>
            </div>
            <div className="author inline">
              <span className=''>Tác giả:</span>
              <span className='font-bold'>Hoa Dương</span>
            </div>
          </div>
          <div className="sa2">
            <div className="publisher inline">
              <span>Nhà xuất bản:</span>
              <span className='font-bold mr-5'>NXB Phụ Nữ</span>
            </div>
            <div className="cover inline">
              <span>Hình thức bìa:</span>
              <span className='font-bold'>Bìa Mềm</span>
            </div>
          </div>
        </div>
        <div className="view-rate">*****</div>
        <FlashSaleBanner/>
      </div>
    </div>

    <div className="info-detail bg-white rounded mt-5">
      <h1 className='font-bold'>Thông tin sản phẩm</h1>
      <table></table>
      <div className="description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus fugiat, in eum quos doloribus deserunt numquam voluptatibus obcaecati libero beatae doloremque? Rem culpa maxime adipisci exercitationem laudantium labore et dignissimos!
      </div>
    </div>
    </main>
  )
}
