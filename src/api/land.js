import * as API from './'

export default {
    getPermission: params => {
        return API.GET('/user/api/permission_user/?time=' + new Date().getTime())
    }
}