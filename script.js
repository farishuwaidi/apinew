const searchInput = document.getElementById('search-input')
const news = document.getElementById('row')

const urlapi = 'https://newsapi.org/v2/top-headlines?' +'country=id&' +'from=2023-02-28&' +'sortBy=popularity&' +'apiKey=ad935f0d60034b27844e872e1fa4e792';

const initialPromise = (url) => {
    return new Promise((resolve, reject) => {
        if(url != 0) {
            fetch(url)
                .then((data) => data.json())
                .then((data) => {
                    resolve(data.articles)
                })
        } else {
            reject('Gagal memuat data')
        }
    })
}
window.addEventListener('onload', showData(urlapi))

searchInput.addEventListener('input', searchNews)
function searchNews(){
    let textUrl = searchInput.value
    if(textUrl.length >= 1) {
        searchUrl = `https://newsapi.org/v2/everything?q=${textUrl}&searchIn=title&apiKey=ad935f0d60034b27844e872e1fa4e792`
        showData(searchUrl)
    } else {
        return news.innerHTML = `
        <p class="text-center">Data Tidak Ditemukan</p>
        `
    }
    console.log(textUrl)
}

function showData(url){
    initialPromise(url)
        .then((data)=>{
            news.innerHTML = render(data)
        })
        .catch((error) => news.innerHTML = error)
}

function render(result) {
    let card = ''
    result.forEach((result, index) => {
        card += `
        <div class="col-lg-4 col-md-6 mt-3" ${index}>
            <a href="${result.url}" class="text-decoration-none text-dark">
                <div class="card" style="height:450px">
                    <img src="${result.urlToImage}" class="card-img-top" alt="thumbnail" style="height: 250px;object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${result.title}</h5>
                        <h6>${result.author} <span class="fw-normal">${result.publishedAt}</span></h6>
                        <p class="card-text" style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${result.content}</p>
                    </div>
                </div>
            </a>
        </div>
        `
    })
    return card
    
}