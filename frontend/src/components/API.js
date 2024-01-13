export default class API {
    static EditItem(id, body, page){
        return fetch(`http://localhost:5000/${page}/edit/${id}`, {
            'method':'PUT',
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(resp=> resp.json())
    }

    static CreateItem(body, page){
        return fetch(`http://localhost:5000/${page}/add`, {
            'method':'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(resp=> resp.json())
    }

    static DeleteItem(id, page){
        return fetch(`http://localhost:5000/${page}/delete/${id}`, {
            'method':'DELETE',
            headers : {
                'Content-Type':'application/json'
            },
             
        })
        
    }
    static Check(page){
        return fetch(`http://localhost:5000/${page}/delete`, {
            'method':'DELETE',
            headers : {
                'Content-Type':'application/json'
            },
             
        })
        
    }
    static GetItems(body, page){
        return fetch(`http://localhost:5000/${page}/get`, {
            'method':'GET',
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(resp=> resp.json())
    }
}