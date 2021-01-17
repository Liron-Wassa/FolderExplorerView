class Node {
    constructor(name) {
        this.name = name;
        this.childrens = [];
        this.parent = null;
    };
};

class Tree {

    constructor(folderName) {
        if(!folderName) throw new Error('Tree constructor must be initialized with value');

        const newNode = new Node(folderName);
        this.root = newNode;
    };

    #isNodeNotExist(folderName, nodesList) {

        for (let index = 0; index < nodesList.length; index++) {
            const node = nodesList[index];

            if(node.name === folderName) {
                return false;
            };
        };

        return true;
    };

    insert(parentFolderName, newFolderName) {

        if(this.root.name === parentFolderName && this.#isNodeNotExist(newFolderName, this.root.childrens)) {
            const newNode = new Node(newFolderName);

            newNode.parent = this.root;
            this.root.childrens.push(newNode);
            
            return newNode;
        };
        
        let currentNode = this.root;
        const queues = [currentNode];
        
        while(queues.length !== 0) {
            currentNode = queues.shift();

            const foundParentNode = currentNode.childrens.find(node => {
                if(node.name === parentFolderName) {
                    return node;
                }
                else {
                    queues.push(node);
                };
            });

            if(foundParentNode && this.#isNodeNotExist(newFolderName, foundParentNode.childrens)) {
                const newNode = new Node(newFolderName);

                newNode.parent = foundParentNode;
                foundParentNode.childrens.push(newNode);

                return newNode;
            };
        };

        return null;
    };

    BFS() {
        
        let currentNode = this.root;
        const allNodes = [];
        const queues = [currentNode];
        
        while(queues.length !== 0) {
            currentNode = queues.shift();
            allNodes.push(currentNode);

            for (let index = 0; index < currentNode.childrens.length; index++) {
                const node = currentNode.childrens[index];
                queues.push(node);
            };

        };

        return allNodes;
    };
};