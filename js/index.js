let post = document.querySelector('.post').cloneNode(true);

const getData = async ($way) => {
    const response = await fetch($way)
    const result = await response.json();
    return result;
}

let users = [];
getData('https://jsonplaceholder.typicode.com/users').then(result => result.map((value) => users.push(value)));
//console.log(users);
    
getData('https://jsonplaceholder.typicode.com/posts')
  .then(json => {       
        json.map((value) => {
            post = document.querySelector('.post').cloneNode(true);
            
            post.querySelector('#user').innerHTML = users[value.userId - 1].name;
            //console.log(users[value.userId - 1]);
            //console.log(value.userId);
            post.querySelector('#post h3').innerHTML = value.title;  
            post.querySelector('#post p').innerHTML = value.body; 
            document.querySelector('.posts').append(post);
        })
        document.querySelector('.post').remove();

  })


