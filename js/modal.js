let open_modal = document.querySelectorAll('.open_modal');
let close_modal = document.getElementById('close_modal');
let modal = document.getElementById('modal');
let body = document.getElementsByTagName('body')[0];

const closeModal = () => {
    modal.classList.add('bounceOutDown'); 
    window.setTimeout(function() { 
        modal.classList.remove('modal_vis'); 
        body.classList.remove('body_block'); 
    }, 500);
}
