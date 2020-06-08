const input = document.querySelector('input');
const button = document.querySelector('button');
button.addEventListener('click', ()=>{
    fetch('http://localhost/weather?address=' + input.value)
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data)
        }
    })
})