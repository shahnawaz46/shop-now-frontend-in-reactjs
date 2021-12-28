export const apiUrl = 'https://fuzicon-backend-server.herokuapp.com/api'

export const giveMeImages = (image_link) => {
    return `https://fuzicon-backend-server.herokuapp.com//productImages/${image_link}`
}

export const giveMeBannerImages = (image_link) => {
    return `https://fuzicon-backend-server.herokuapp.com//BannerImages/${image_link}`
}

export const giveMeProfileImage = (image_link) => {
    return `https://fuzicon-backend-server.herokuapp.com//profileImages/${image_link}`
}
