const convertedIdsToEntities = entities.map(entity => entity.id.split(/[\s:]+/));
const tree = new Tree(convertedIdsToEntities[0][0]);

fillTreeWithEntities();

function fillTreeWithEntities() {
    for (let i = 0; i < convertedIdsToEntities.length; i++) {
        const idEntities = convertedIdsToEntities[i];
    
        for (let j = 1; j < idEntities.length; j++) {
            const leftIdEntity = idEntities[j - 1];
            const rightIdEntity = idEntities[j];
            
            tree.insert(leftIdEntity, rightIdEntity);
        };  
    };
};

renderFolders();

function renderFolders() {
    const folderElements = generateHtmlTemplate(tree.root);
    
    const foldersContainer = document.querySelector('.foldersContainer');
    foldersContainer.innerHTML = folderElements;
};

function generateHtmlTemplate(rootFolder = null, subFolders = []) {
    let htmlElements = '';

    if(rootFolder) {
        htmlElements += `<ul class='folder'>`;
        htmlElements += `<li class='close' onclick='openFolder.bind(this)(event)'>`;
        htmlElements += `<i class='far fa-folder'></i>`;
        htmlElements += `<span>${rootFolder.name}</span>`;
        htmlElements += `</li>`;
        htmlElements += generateHtmlTemplate(null, rootFolder.childrens);
        htmlElements += `</ul>`;
    };

    for (let index = 0; index < subFolders.length; index++) {    
        const folder = subFolders[index];

        htmlElements += `<ul class='folder'>`;
        htmlElements += `<li class='close' onclick='openFolder.bind(this)(event)'>`;
        htmlElements += `<i class='far fa-folder'></i>`;
        htmlElements += `<span>${folder.name}</span>`;
        htmlElements += `</li>`;

        if(folder.childrens.length) {
            htmlElements += generateHtmlTemplate(null, folder.childrens);
        };

        htmlElements += `</ul>`;
    };

    return htmlElements;
};

function openFolder(event) {
    event.stopPropagation();

    if(this.classList[0] === 'close') {
        this.childNodes[0].classList.remove('fa-folder');
        this.childNodes[0].classList.add('fa-folder-open');
        this.classList.remove('close');
        this.classList.add('open');
    }
    else {
        this.childNodes[0].classList.remove('fa-folder-open');
        this.childNodes[0].classList.add('fa-folder');
        this.classList.remove('open');
        this.classList.add('close');
    };
};