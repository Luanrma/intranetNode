
// Responsável por impedir que a página recarregue ao dar "SUBMIT"
function saveTopic(event) {
	
	const form = document.querySelector('#userData')
	const msg = document.querySelector("#msg")

	let user    = {};
	
	[...form.getElementsByClassName("inputData")].forEach(field => {
		
		console.log("field: ", field.name)

		user[field.name] = field.value;

		console.log("campo: ", user[field.name])

		// Verifica se todos os campos foram preenchidos
		if (!field.value) {

			event.preventDefault(); // previne que atualize a página.
			
			msg.innerHTML = `<p class="text-danger">Informe todos os campos!</p>`
		
		}
	});
}

