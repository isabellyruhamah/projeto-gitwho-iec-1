const input = document.querySelector('.input')
const form = document.querySelector('.form')

const infosFn = async (nome) => {
    try {
        const resposta = await fetch(`https://api.github.com/users/${nome}`)
        const data = await resposta.json()
        let ctx = document.createElement('div')
        ctx = `
            <div class="ctx">
                <div>
                    <img src="${data.avatar_url}">
                    <h2>${data.name}</h2>
                    <p>${data.login}</p>
                </div>
                <div>
                    
                    <p>${data.bio ? `Bio: ${data.bio}`:''}</p>

                    <p>Seguidores: ${data.followers} | Seguindo: ${data.following}</p>
                    <p>Repositórios públicos: ${data.public_repos}</p>
                    <a href="${data.html_url}" target="_blank">Acesse o perfil</a>
                </div>
            </div>
        `
        document.querySelector('.infos').innerHTML = ctx
        console.log(data.name)
    } catch (err) {
        console.log(err)
    }
}

const reposFn = async (nome) => {
    try {
        const resposta = await fetch(`https://api.github.com/users/${nome}/repos`)
        const data = await resposta.json()

        let ctx = ''
        data.forEach((repo) => {
            ctx += `
                <div class = "repo">
                  <h2>${repo.name}</h2>
                  <hr>
                  <p>${repo.allow_forking ? 'Permite fork' : 'Não permite fork'}</p>

                  <p><a href="${repo.clone_URL}">URL para clone<a></p>

                  <p>Data de criação: ${new Date(repo.created_at).toLocaleDateString('pt-br')}</p>

                  <p>Última atualização: ${new Date(repo.updated_at).toLocaleDateString('pt-br')}</p>

                  <p>Branch: ${repo.defalt_branch}</p>

                  <p>${repo.description != null ? `Descrição: ${repo.description}` : 'Sem descrição'}<p> 

                  <p>${repo.language != null ?`Linguagem: ${repo.language}` : 'Sem descrição'}</p>

                  <p>${repo.visibility === 'public' ? 'Repositório público' : 'Repositório privado'}</p>
                </div>
            `
            document.querySelector('.repos').innerHTML = ctx
        })
    } catch (err) {
        console.log(err)
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    infosFn(input.value)
    reposFn(input.value)
})
    