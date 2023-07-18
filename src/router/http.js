import axios from 'axios'
import {Toast} from 'vant'

const request=axios.create({
	baseURL:'http://localhost:8081',
	timeout:10000,
	headers:{
		'content-Type':"application/json;charset=UTF-8"
	}
})

// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
	Toast.loading({
	  message: '加载中...',
	  forbidClick: true,
	  duration:0
	});
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  
  request.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
	  Toast.clear()
      return response;
    }, function (error) {
		 Toast.clear()
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    });


export default request