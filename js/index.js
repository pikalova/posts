const address = (value) => value.zipcode + ', ' + value.city + ', ' + value.street + ', ' + value.suite;

let post = document.querySelector('.user').cloneNode(true);
let form = document.querySelector('.modal_txt');
let user;

const editUser = function (event) {
    modal.classList.add('modal_vis'); 
    modal.classList.remove('bounceOutDown'); 
    body.classList.add('body_block'); 
    
    user = event.target.offsetParent;
    let modalTxt = document.querySelector(".modal_txt");
    
    let content = "";
    for (i = 1; i < user.children.length - 1; i++){
        content = content + "<div>" + user.children[i].textContent.split(": ")[0] +
        `: </div><input name=${user.children[i].textContent.split(": ")[0]} value='` +  user.children[i].textContent.split(": ")[1] + "'>";
    }
    
    modalTxt.innerHTML = content;
    const buttonEdit = document.createElement('button');
    buttonEdit.textContent = 'Внести изменения';
    buttonEdit.classList.add('button');
    buttonEdit.type = "submit";
    
    modalTxt.append(buttonEdit);
}

const deleteUser = function () {
    fetch(`https://jsonplaceholder.typicode.com/users/${event.target.offsetParent.querySelector("#id").textContent}`, {
        method: 'DELETE'
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
    event.target.offsetParent.remove()  ;
    
}

form.addEventListener('submit', async function(){
    event.preventDefault();
    const {
        Name: {value : name},
        UserName: {value : userName},
        Email: {value : email},
        Address: {value : address},
        Phone: {value : phone},
        Website: {value : website},
        Company: {value : company}
    } = event.target;
    let addressArray = address.split(', ');
    let data = {
        'name': name,
        'username': userName,
        'email': email,
        'address': {
            'suite': addressArray[3],
            'street': addressArray[2],
            'city': addressArray[1],
            'zipcode': addressArray[0],
        },
        'phone': phone,
        'website': website,
        'company': {'name': company},

    }
    fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
  .then((response) => response.json())
  .catch((error) => console.log(error));

    card(user, data);
    closeModal();
})

const getData = async ($way) => {
    try {
        const response = await fetch($way);
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
}
const card = function(userCard, value){
    userCard.querySelector('#id').innerHTML = value.id;
    userCard.querySelector('#name').innerHTML = "Name: <b>" + value.name + "</b>";
    userCard.querySelector('#username').innerHTML = "UserName: <b>" + value.username + "</b>";
    userCard.querySelector('#email').innerHTML = "Email: <b>" + value.email + "</b>";
    userCard.querySelector('#address').innerHTML = "Address: <b>" + address(value.address) + "</b>";
    userCard.querySelector('#phone').innerHTML = "Phone: <b>" + value.phone + "</b>";
    userCard.querySelector('#website').innerHTML = "Website: <b>" + value.website + "</b>";
    userCard.querySelector('#company').innerHTML = "Company: <b>" + value.company.name + "</b>";
    userCard.querySelector('.edit').addEventListener('click', editUser);
    userCard.querySelector('.delete').addEventListener('click', deleteUser);
    return userCard;
}

getData('https://jsonplaceholder.typicode.com/users')
  .then(json => {       
        json.map((value) => {
            post = document.querySelector('.user').cloneNode(true);
            document.querySelector('.users').append(card(post, value));           
        })
        document.querySelector('.user').remove();

  })
  .catch(console.log("error"));

