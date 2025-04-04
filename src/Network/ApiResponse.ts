export class ApiResponse {
    status: Boolean = false
    data?: any
    message: string = ''

    constructor(status: Boolean, message: string, data: any) {
        this.status = status
        this.message = message
        this.data = data
    }
}
