const filteredEntities = entities.map(entity => entity.id.split(/[\s:]+/));

const tree = new Tree(filteredEntities[0][0]);

fillTreeWithEntities();

function fillTreeWithEntities() {
    for (let i = 0; i < filteredEntities.length; i++) {
        const idEntities = filteredEntities[i];
    
        for (let j = 1; j < idEntities.length; j++) {
            const leftIdEntity = idEntities[j - 1];
            const rightIdEntity = idEntities[j];
            
            tree.insert(rightIdEntity, leftIdEntity);
        };  
    };
};

const documentFragment = document.createDocumentFragment();
const folders = tree.BFS();

renderRootFolder();

function renderRootFolder() {
    const [ul, li, span, i] = createHTMLElements(['ul', 'li', 'span', 'i']);

    span.textContent = folders[0].name;
    
    li.addEventListener('click', openFolderHandler);

    i.setAttribute('class', 'far fa-folder');
    
    li.append(i, span);
    ul.append(li);
    documentFragment.append(ul);
};

function createHTMLElements(elementList) {
    const htmlList = [];
    let element;

    for (const item of elementList) {
        element = document.createElement(item);
        htmlList.push(element);
    };

    return htmlList;
};

renderSubFolders();

function renderSubFolders() {  
    for (let index = 1; index < folders.length; index++) {    
        const folder = folders[index];

        const [ul, li, span, i] = createHTMLElements(['ul', 'li', 'span', 'i']);

        let nodeList = documentFragment.querySelectorAll('ul');
        let parentIndex = findParentIndex(nodeList, folder.parent.name);

        span.textContent = folder.name;
        
        li.addEventListener('click', openFolderHandler);
        
        i.setAttribute('class', 'far fa-folder');
        ul.setAttribute('class', 'folder');
        
        li.append(i, span);
        ul.append(li);
        nodeList[parentIndex].append(ul);
    };

    document.body.append(documentFragment);
};

function findParentIndex(nodeList, parentName) {
    for (let i = 0; i < nodeList.length; i++) {
        const li = nodeList[i].children;
        
        for (let j = 0; j < li.length; j++) {
            const element = li[j];

            if(element.children[1]?.innerHTML === parentName) return i;
        };  
    };
};

function openFolderHandler(event) {
    event.stopPropagation();
    
    changeFolderStateStyle(event.target.children[0]);

    for (let index = 1; index < this.parentElement.children.length; index++) {
        const element = this.parentElement.children[index];
        element.classList.toggle('folder');
    };
};

function changeFolderStateStyle(folderIcon) {
    if(folderIcon.className.endsWith('open')) {
        folderIcon.classList.remove('fa-folder-open');
        folderIcon.classList.add('fa-folder');
    }
    else {
        folderIcon.classList.add('fa-folder-open');
        folderIcon.classList.remove('fa-folder');
    };
};