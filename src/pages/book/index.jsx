import React, { useEffect } from 'react'
import BookCard from '../../components/BookCard'

export default function Book() {

  useEffect(() => {
    // scroll to top when access this page
    window.scrollTo(
      {
        top: 0,
        behavior: 'smooth'
      }
      )
}, [])

  const book = {
    thumbnailUrl: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_29246.jpg", 
    title:"Dạy sao cho trẻ nghe lời",
    price: "70.000", 
    salePrice: "80.000", 
    sold: "10"
  }
  return (
    <>
      <div className="grid gap-4 p-5 m-5 sm:grid sm:grid-cols-5">
          <BookCard {...book}/>
          <BookCard {...book}/>
          <BookCard {...book}/>
          <BookCard {...book}/>
          <BookCard {...book}/>
          <BookCard {...book}/>
        </div>
    </>
  )
}
