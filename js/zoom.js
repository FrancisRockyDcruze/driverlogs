<<<<<<< HEAD

function openImage(src) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modalImg.src = src;
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    setTimeout(() => modalImg.classList.add('scale-100'), 10);

}

function closeImage() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    modalImg.classList.remove('scale-100');
    modalImg.classList.add('scale-90');

    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }, 300); // match transition duration
}


=======

function openImage(src) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modalImg.src = src;
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    setTimeout(() => modalImg.classList.add('scale-100'), 10);

}

function closeImage() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    modalImg.classList.remove('scale-100');
    modalImg.classList.add('scale-90');

    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }, 300); // match transition duration
}


>>>>>>> 2414d09a62b0ef3f192e544f2f34e5e947afbe18
