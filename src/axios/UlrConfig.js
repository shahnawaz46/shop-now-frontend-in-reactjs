export const apiUrl = 'http://localhost:9000/api'

export const giveMeImages = (image_link) => {
    return `http://localhost:9000//productImages/${image_link}`
}

export const giveMeBannerImages = (image_link) => {
    return `http://localhost:9000//BannerImages/${image_link}`
}

export const giveMeProfileImage = (image_link) => {
    return `http://localhost:9000//profileImages/${image_link}`
}
