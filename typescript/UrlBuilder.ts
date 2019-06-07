class UrlBuilder {
    baseUrl: string
    pathParams: string[]
    queryParams: Map<string, string>

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
        this.pathParams = []
        this.queryParams = new Map()
    }

    withPathParam = (value: string): UrlBuilder => {
        this.pathParams.push(value)
        return this
    }

    withQueryParam = (name: string, value: string): UrlBuilder => {
        this.queryParams.set(name, value)
        return this
    }

    buildQueryParams = (): string => {
        if (this.queryParams.size > 0) {
            let params = ''
            let first = true

            this.queryParams.forEach((value, key) => {
                params = params + `${first ? '?' : '&'}${key}=${value}`
            })

            return params
        }
        return ''
    }

    build = (): string => {
        let url = [this.baseUrl, ...this.pathParams].join('/')
        url = url + this.buildQueryParams()
        return url
    }
}

export default UrlBuilder