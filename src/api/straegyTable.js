import * as API from './'

export default {
    getPermission: params => {
        return API.GET('industry/api/opsmarketmap/')
    }
}