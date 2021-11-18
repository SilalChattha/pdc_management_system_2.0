
const ws = new WebSocket(`ws://localhost:8080`)
const [email,setemail] = React.useState('')
const [password,setpass] = React.useState('')
const [privilege,setpriv] = React.useState('')

function sete (event){
    setemail(event.value)
}
function setpa (event){
    setpass(event.value)
}
function setp (event){
    setpriv(event.value)
}

function sendLogin(event){
        // setemail(document.getElementById('email').value)
        // setpass(document.getElementById('Pass').value)
        // setpriv(document.getElementById('check').value)
    const clientMessage = {
        type: `sign_in`,
        username: email,
        password: password,
        priv: privilege,
    }
    ws.send(JSON.stringify(clientMessage))
}

const User = () => {


    ws.onevent = (event) => {
        const clientMessage = JSON.parse(event.data)
        
    
    }
    

}

ReactDOM.render(<User />, document.querySelector(`#root`))
