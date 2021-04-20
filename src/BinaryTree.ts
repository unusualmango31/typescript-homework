export class TreeNode<T> {
    constructor(private _data: T, private _left: TreeNode<T> | null, private _right: TreeNode<T> | null) {
    }

    get data(): T {
        return this._data;
    }

    set data(value: T) {
        this._data = value;
    }

    get left(): TreeNode<T> | null  {
        return this._left;
    }

    set left(value: TreeNode<T> | null) {
        this._left = value;
    }


    get right(): TreeNode<T> | null {
        return this._right;
    }

    set right(value: TreeNode<T> | null) {
        this._right = value;
    }
}

export class BinaryTree<T> {
    private _root: TreeNode<T> | null = null;
    private _size: number = 0;

    constructor(private _maxDepth: number, private _maxWidth: number) {
    }

    get size(): number {
        return this._size;
    }

    get root(): TreeNode<T> | null {
        return this._root;
    }

    get maxWidth(): number {
        return this._maxWidth;
    }

    get maxDepth(): number {
        return this._maxDepth;
    }

    add(data: T): void {
        const newNode = new TreeNode(data, null, null);
        if (this._maxDepth <= this.getTreeDepth()) {
            throw new Error("Max depth is reached");
        }

        if (this._maxWidth <= this.getTreeWidth()) {
            throw new Error("Max depth is reached");
        }

        if ( this._root === null ) {
            this._root = newNode;
            this._size++;
        } else if (this.checkExistData(this._root, data) === true) {
            throw new Error(`\nData value: ${data}\nThis data is already exist`);
        } else {
            this.addNode(this._root, newNode);
        }
    }

    // Вспомогательный метод для add
    private addNode(parentNode: TreeNode<T>, childNode: TreeNode<T>): void {
        if (childNode.data < parentNode.data) {
            if (parentNode.left === null) {
                parentNode.left = childNode;
                this._size++;
            } else {
                this.addNode(parentNode.left, childNode);
            }
        } else {
            if (parentNode.right === null) {
                parentNode.right = childNode;
                this._size++;
            } else {
                this.addNode(parentNode.right, childNode);
            }
        }
    }

    remove(data: T): void {
        this._root = this.deleteNode(this.root, data);
        this._size--;
    }

    // Вспомогательный метод для delete
    private deleteNode(node: TreeNode<T> | null, data: T): TreeNode<T> | null {
        if (node === null) {
            throw new Error("Node doesn't exist");
        }

        if (data < node.data) {
            node.left = this.deleteNode(node.left, data);
            return node;
        }

        if (data > node.data) {
            node.right = this.deleteNode(node.right, data);
            return node;
        }

        if (node.left === null && node.right === null) {
            node = null;
            return node;
        }

        if (node.left === null) {
            node = node.right;
            return node;
        }

        if (node.right === null) {
            node = node.left;
            return node;
        }

        const newNode = this.minNode(node.right);
        node.data = newNode.data;
        node.right = this.deleteNode(node.right, newNode.data);
        return node;
    }

    private minNode(node: TreeNode<T>): TreeNode<T> {
        if (node.left === null) {
            return node;
        }

        return this.minNode(node.left);
    }

    private checkExistData(node: TreeNode<T> | null, data: T): boolean {
        if (node === null ) {
            return false;
        }
        if (node.data === data) {
            return true;
        }
        if (node.left === null && node.right === null) {
            return false;
        }
        if (data <= node.data) {
            return this.checkExistData(node.left, data);
        }
        if (data >= node.data) {
            return this.checkExistData(node.right, data);
        }
        return false;
    }

    getTreeDepth(): number {
        return this.getDepth(this.root);
    }

    getDepth(node: TreeNode<T> | null): number {
        if (node === null) {
            return 0;
        }

        const lpath: number = this.getDepth(node.left),
              rpath: number = this.getDepth(node.right);

        if (lpath < rpath) {
            return rpath + 1;
        }
        return lpath + 1;
    }

    getTreeWidth(): number {
        let maxWidth: number = 0,
            width: number = 0;
        for (let i = 1; i < this.getTreeDepth(); i++) {
            width = this.getWidth(this.root, i);
            if (width > maxWidth) {
                maxWidth = width;
            }
        }

        return maxWidth;
    }

    getWidth(node: TreeNode<T> | null, level: number): number {
        if (node === null) {
            return 0;
        }
        if (level === 1) {
            return 1;
        }
        if (level > 1) {
            return this.getWidth(node.left, level - 1) + this.getWidth(node.right, level - 1);
        }
        return 0;
    }

    treeTraverse(callback: Function): void {
        if (this._root === null) {
            throw new Error("Root is null");
        }
        this.preOrderTraverse(this._root, callback);
    }

    // Вспомогательный метод для treeTraverse. В данном случае реализован симметричный обход дерева
    private preOrderTraverse(node: TreeNode<T> | null, callback: Function): void {
        if (node === null) {
            return;
        }
        callback(node.data);
        this.preOrderTraverse(node.left, callback);
        this.preOrderTraverse(node.right, callback);
    }

    /*
      т.к. и ключ и данные представляют в данной реализации одно и тоже,
      то метод searchData будет возвращать вместо данных - булевое значение,
      которое сообщает существует ли данное значение в дереве
    */
    searchData(data: T): boolean {
        if (this._root === null) {
            throw new Error("Root is null");
        }
        return this.checkExistData(this._root, data);
    }
}
