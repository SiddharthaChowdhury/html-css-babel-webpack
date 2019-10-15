export function req (method, url, data = null) {
    let xhr;
    if(window.XMLHttpRequest) { xhr = new XMLHttpRequest() }
    else { xhr = new ActiveXObject("Microsoft.XMLHTTP") }

    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {  
                    resolve(xhr.responseText);
                } else {  
                    reject(xhr.responseText);  
                }
            }
        }
        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data ? JSON.stringify(data) : null);
    })    
}
