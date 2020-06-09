const input = document.querySelector('input');
const button = document.querySelector('button');
const div = document.querySelector('.weather')
button.addEventListener('click', ()=>{
    fetch('/weather?address=' + input.value)
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            div.innerText = data.error
        } else {
            div.innerText = data
        }
    })
})