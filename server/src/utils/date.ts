const date = () => {
    let data = new Date()
    let dia = String(data.getDate()).padStart(2, '0');
    let mes = String(data.getMonth() + 1).padStart(2, '0');
    let ano = String(data.getFullYear()).padStart(2, '0');
    let horas = String(data.getHours()).padStart(2,'0')
    let minutos = String(data.getMinutes()).padStart(2, '0')
    let segundos = String(data.getSeconds()).padStart(2 , '0')
    return `[ ${dia}/${mes}/${ano}:${horas}:${minutos}:${segundos} ]`
}

export {date}