import $ from 'jquery';

export default class SendRequest {
    fullReq(method, url, data) {
        return new Promise((resolve, reject) => {            
            $.ajax({
                type: method,
                url: url,
                data: data, 
                dataType: 'json', 
                success: (data, status) => {
                    if (status === 'success') {
                        resolve(data);
                    }
                    else {
                        return reject(data);
                    }
                },
                error: (jqXHR) => {
                    if (jqXHR.responseJSON !== undefined && jqXHR.responseJSON.error !== undefined) {
                        return reject(jqXHR.responseJSON);
                    }
                    return reject({error: 'server connection error'});
                }, 
                crossDomain: true
            });            
        });
    }
}
