
import { $http } from '@escook/request-miniprogram'
// $http.baseUrl = 'http://localhost:9001'

//////////////////////////////////////////////////////////
// Tip:
// This URL is for effects demonstration only,
// please do not use in production environment.
$http.baseUrl = 'http://47.104.180.148:8081'
//////////////////////////////////////////////////////////

// $http.baseUrl = 'http://0.0.0.0:9001'

export const request = $http
