const apiurl = "https://api.lyrics.ovh";
const form = document.getElementById('form')
const search = document.getElementById('search')
const result = document.getElementById('result')
const more = document.getElementById('more')
const searchSong = async searchTerm => {
   const res = await fetch(`${apiurl}/suggest/${searchTerm}`)
const data = await res.json()
console.log(data)
showSongs(data)
}

function showSongs(data){
    let output = "";
    data.data.forEach(song => output += `<li class="song-item">
   <strong> ${song.artist.name} </strong> <span class="dash"> - </span> <span> ${song.title}</span>
   <a class="listen" target="_blank" href=${song.preview}>Listen Preview</a>
    </li>
    `)
    result.innerHTML = `<ul>${output}</ul>`
    if (data.prev || data.next) {
    more.innerHTML = `
    ${data.prev ? `<button onclick="getMoreSongs('${data.prev}')" class="btn">Prev</button>` : ``}
    ${data.next ? `<button onclick="getMoreSongs('${data.next}')" class="btn">Next</button>` : ``}
    `   
    }
}

async function getMoreSongs(link) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${link}`)
    const data = await res.json()
    console.log(data)
    showSongs(data)
}


form.addEventListener('submit', e => {
    e.preventDefault()
    const searchTerm = search.value.trim();
    if(!searchTerm){
        alert('Please, enter the name')
    }
    else{
        searchSong(searchTerm)
    }
})



    