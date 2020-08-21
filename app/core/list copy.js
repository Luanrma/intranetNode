class List {

    constructor(userForm, list, url, show) {

        this.form = document.querySelector(userForm);
        this.list = document.querySelector(list);
        this.url  = url
        this.show = show
        
        this.onSubmit();
    }

    // Responsável por impedir que a página recarregue ao dar "SUBMIT"
	onSubmit() {

		this.form.addEventListener("click", event => {
            event.preventDefault(); // previne que atualize a página.
        
        });
        
        this.updateList(this.url);
    
    }  

    updateList(url) {

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
                    let data = `<a href="../views/topic-answers.html">
                                    <article class="topic-item">
                                        <input type="hidden" id="topic-id-${objeto['ID_TOPIC']}" name="topic-id-${objeto['ID_TOPIC']}"> 
                                        <div class="col-10">
                                            <h5>Luan Miano</h5>
                                            <h3>${objeto['TITLE']}</h3>
                                            <small>${objeto['DT_CREATE']}</small>
                                        </div>
                                        <div class="col-2 topic-icons">
                                            <img src="../assets/icons/message.png" alt="mensagem"><span>${objeto['ANSWERS']}</span>
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
                                        <h3>Vamos falar sobre lero-lero</h3>
                                        <small>By: Luan Miano - 13/08/2020</small>
                                        
                                    </header>
                                    <p>Evidentemente, o novo modelo estrutural aqui preconizado assume importantes posições no estabelecimento da gestão inovadora da qual fazemos parte.
                                        Por outro lado, a valorização de fatores subjetivos representa uma abertura para a melhoria do levantamento das variáveis envolvidas.

                                        Evidentemente, o novo modelo estrutural aqui preconizado assume importantes posições no estabelecimento da gestão inovadora da qual fazemos parte.
                                        Por outro lado, a valorização de fatores subjetivos representa uma abertura para a melhoria do levantamento das variáveis envolvidas.

                                        Evidentemente, o novo modelo estrutural aqui preconizado assume importantes posições no estabelecimento da gestão inovadora da qual fazemos parte.
                                        Por outro lado, a valorização de fatores subjetivos representa uma abertura para a melhoria do levantamento das variáveis envolvidas.
                                    </p>
                                </article>
                                `

                    this.list.innerHTML += data;
                });

            break;
        }
        
    }
}
