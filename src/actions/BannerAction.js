import Axios from '../axios/Axios';
import { bannerConstant } from './Constants';

export const getBanner = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get('/banner/getBanner')
            dispatch({
                type: bannerConstant.GET_BANNER_SUCCESS,
                payload: {
                    bannerDetail: res.data.bannerDetail.filter((value) => value.show === true)
                }
            })
        } catch (error) {
            error.response &&
                dispatch({
                    type: bannerConstant.GET_BANNER_FAIL,
                    payload: {
                        error: error.response.data.error
                    }
                })
        }
    }
}