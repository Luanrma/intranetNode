class Create {

	constructor(formId, url) {

		this.form = document.querySelector(formId);
		this.msg = document.querySelector("#msg");
		
		this.url = url;

		this.onSubmit();
		
	}

	// Responsável por impedir que a página recarregue ao dar "SUBMIT"
	onSubmit() {

		this.form.addEventListener("submit", event => {
			event.preventDefault(); // previne que atualize a página.

			this.getValues();

		});
	}

	// Responsável por pegar os valores inseridos no formulário
	getValues() {

		let isValid = true;
		let user    = {};
		
		[...this.form.getElementsByClassName("inputData")].forEach(event => {
			
			user[event.name] = event.value;
			
			// Verifica se todos os campos foram preenchidos
			if (!event.value) {
				
				this.msg.innerHTML = `<p class="text-danger">Informe todos os campos!</p>`
				
				isValid = false;
				
			}

		});
		
		// Caso algum dos campos não sejam preenchidos, a variável isValid recebe "false" e encerra a execução;
		if (!isValid) {
			return false;
		}
		
			this.requestResponse(user);	
		
	}

	// Responsável pelo REQUEST e RESPONSE do servidor utilizando a API FETCH
	requestResponse(user) {
		console.log(user)
		// Graças a alguma divindade substitui o método xmlhttprequest
		fetch(this.url, {
			method: 'POST',
			body: JSON.stringify(user) //transforma os dados enviados em um objeto JSON
		})
		.then(response => {
			//(response.status == 200)
			this.msg.innerHTML = `<p class="text-success">Obrigado pelo contato ${user.inputNome} - Enviado com sucesso!</p>`
			this.form.reset();
		})
		.catch(response => {
			//retorna os dados da requisição no servidor no formato JSON 
			this.msg.innerHTML = `<p class="text-danger">Erro ao cadastrar!</p>`
		})
		
	}
	
}
