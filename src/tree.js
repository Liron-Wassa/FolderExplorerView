class Node {
    constructor(name) {
        this.name = name;
        this.childrens = [];
        this.parent = null;
    };
};

class Tree {

    constructor(value) {
        if(!value) throw new Error('Tree constructor must be initialized with value');

        const newNode = new Node(value);
        this.root = newNode;
    };

    #isNotExistNode(value, arr) {

        for (let index = 0; index < arr.length; index++) {
            const node = arr[index];

            if(node.name === value) {
                return false;
            };
        };

        return true;
    };

    insert(name, parentName) {

        if(this.root.name === parentName && this.#isNotExistNode(name, this.root.childrens)) {
            const newNode = new Node(name);

            newNode.parent = this.root;
            this.root.childrens.push(newNode);
            
            return newNode;
        };
        
        let currentNode = this.root;
        const queues = [currentNode];
        
        while(queues.length !== 0) {
            currentNode = queues.shift();

            const foundNode = currentNode.childrens.find(node => {
                if(node.name === parentName) {
                    return node;
                }
                else {
                    queues.push(node);
                };
            });

            if(foundNode && this.#isNotExistNode(name, foundNode.childrens)) {
                const newNode = new Node(name);

                newNode.parent = foundNode;
                foundNode.childrens.push(newNode);

                return newNode;
            };
        };

        return null;
    };

    BFS() {
        
        let currentNode = this.root;
        const results = [];
        const queues = [currentNode];
        
        while(queues.length !== 0) {
            currentNode = queues.shift();
            results.push(currentNode);

            for (let index = 0; index < currentNode.childrens.length; index++) {
                const node = currentNode.childrens[index];
                queues.push(node);
            };

        };

        return results;
    };
};