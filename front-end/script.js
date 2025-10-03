document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroForm');
    const feedbackMessage = document.getElementById('feedbackMessage');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const payload = {
            dono: {
                nome_completo: data.nome_completo,
                cpf: data.cpf,
                email: data.email,
                telefone: data.telefone,
                endereco: data.endereco
            },
            animal: {
                nome_pet: data.nome_pet,
                especie: data.especie,
                raca: data.raca,
                data_nascimento: data.data_nascimento,
                observacoes: data.observacoes
            }
        };

        try {
            const response = await fetch('http://localhost:3000/donos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                feedbackMessage.textContent = 'Cliente e pet cadastrados com sucesso!';
                feedbackMessage.className = 'success';
                form.reset();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ocorreu um erro ao cadastrar.');
            }

        } catch (error) {
            feedbackMessage.textContent = error.message;
            feedbackMessage.className = 'error';
            console.error('Erro no cadastro:', error);
        }

        setTimeout(() => {
            feedbackMessage.className = '';
            feedbackMessage.textContent = '';
        }, 5000);
    });
});