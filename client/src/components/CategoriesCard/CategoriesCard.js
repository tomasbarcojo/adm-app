import React from 'react'
import Img from '../../images/cigarrillos-1.jpg'

// LEER ACA PARA LAS IMAGENES GUARDADAS EN EL BACK//

// https://www.freecodecamp.org/news/react-background-image-tutorial-how-to-set-backgroundimage-with-inline-css-style/

// // // // //


export default function CategoriesCard({ nameCategory, image }) {
    return (
        <div style={{
            backgroundImage: `url(${Img})`,
            backgroundSize: 'cover',
            padding: '20px 100px 20px 100px',
            borderRadius: '10px'
        }}>
            {/* <img src={Img} alt='Imagen de categoria' /> */}
            <h1>Cigarrillos</h1>
        </div>
    )
}
