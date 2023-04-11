export const apiUrl = 'https://ecommerce-server-1cz2.onrender.com/api'
// export const apiUrl = 'http://localhost:9000/api'

export const giveMeImages = (image_link) => {
    // return `https://fuzicon-backend-server.herokuapp.com//productImages/${image_link}`
    return `http://localhost:9000/productImages/${image_link}`
}

export const giveMeBannerImages = (image_link) => {
    return `https://fuzicon-backend-server.herokuapp.com//BannerImages/${image_link}`
}

export const giveMeProfileImage = (image_link) => {
    return `https://fuzicon-backend-server.herokuapp.com//profileImages/${image_link}`
}
