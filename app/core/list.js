class List {

    constructor(list, url, show) {

        this.list = document.querySelector(list);
        this.show = show;     
        this.updateList(url);
        

    }


    updateList(url) {
        console.log('URL: ',url)
        fetch(url)
        
        .then(response => {response.json()
            
            .then(data => {
                
                this.printList(data, this.show)
                
            })

        })

        .catch(error => {

            console.log(error.message);

        })
    }
    
    printList(arrayJson, show) {
        console.log(arrayJson)

        switch(show) {

            case 1:
                arrayJson.forEach(objeto => {
                    let data = `<a href="../views/topic-answers.html?topic=${objeto['ID_TOPIC']}">
                                    <article class="topic-item">
                                        <div class="col-10">
                                            <h5>Luan Miano</h5>
                                            <h3>${objeto['TITLE']}</h3>
                                            <small>${objeto['DT_CREATE']}</small>
                                        </div>
                                        <div class="col-2 topic-icons">
                                            <img src="../../public/icons/message.png" alt="mensagem"><span>${objeto['ANSWERS']}</span>
                                        </div>
                                    </article>
                                 </a>
                                `
                    this.list.innerHTML += data;
                });

            break;

            case 2:
                arrayJson.forEach(objeto => {
                    let data = ` <td>${objeto['USER']} </td>
                                 <td>${objeto['EMAIL']}</td>
                                 <td>${objeto['PASS']} </td>
                                 <td><a type="button" key="${objeto['ID_USER']}">Editar</a></td>`;
                    this.list.innerHTML += data;
                });

            break;

            case 3:
                arrayJson.forEach(objeto => {
                    let data = `<article class="topic">
                                    <header>
                                        <h3>${objeto['TITLE']}</h3>
                                        <small>By: ${objeto['ID_TOPIC']} - ${objeto['DT_CREATE']}</small>
                                    </header>
                                    <p>${objeto['QUESTION']}</p>
                                </article>
                                `
                    this.list.innerHTML += data;
                });

            break;
        }  
    }
}
