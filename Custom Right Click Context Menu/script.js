const image = document.getElementById('image');
const contextMenu = document.querySelector('.context-menu');

image.addEventListener('contextmenu', showContextMenu);

function showContextMenu(e) {
    e.preventDefault();
    contextMenu.style.top = e.clientY + 'px';
    contextMenu.style.left = e.clientX + 'px';
    contextMenu.classList.add('show');
    
    document.addEventListener('click', closeContextMenu);
}

function closeContextMenu() {
    contextMenu.classList.remove('show');
    
    document.removeEventListener('click', closeContextMenu);
}

image.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

