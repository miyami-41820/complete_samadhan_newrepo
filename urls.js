const urls = {
    // BASE_URL: 'http://192.168.1.80:3489/',
    BASE_URL: 'http://localhost:8000/',
    send_otp: 'users/send-otp-phone',
    resend_otp: 'users/resend-otp-phone',
    verify_otp: 'users/verify-otp-phone',
    update_user: 'users/update-user',
    get_user_data: 'users/user-data',
    get_services: 'services',
    get_user_services: 'services/user-services',
    request_service: 'services/request-service',
    get_requests: 'services/get-requests',
    update_request: 'services/update-request',
}

export default urls;