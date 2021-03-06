export class HttpClient {

    GET<TResponse = any>(url: string): Promise<TResponse> {
        return fetch(url).then(response => response.json());
    }

    POST<TResponse = any>(url: string, data: any = {}): Promise<TResponse> {
        return fetch(url, {
            method: 'post', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        }).then(response => response.json());
    }
}
