var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ExistError = /** @class */ (function (_super) {
    __extends(ExistError, _super);
    function ExistError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "ExistError";
        return _this;
    }
    return ExistError;
}(Error));
var TreeNode = /** @class */ (function () {
    function TreeNode(_data, _left, _right) {
        this._data = _data;
        this._left = _left;
        this._right = _right;
    }
    Object.defineProperty(TreeNode.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "left", {
        get: function () {
            return this._left;
        },
        set: function (value) {
            this._left = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "right", {
        get: function () {
            return this._right;
        },
        set: function (value) {
            this._right = value;
        },
        enumerable: false,
        configurable: true
    });
    return TreeNode;
}());
export { TreeNode };
var BinaryTree = /** @class */ (function () {
    function BinaryTree(_maxDepth, _maxWidth) {
        this._maxDepth = _maxDepth;
        this._maxWidth = _maxWidth;
        this._root = null;
        this._size = 0;
    }
    Object.defineProperty(BinaryTree.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryTree.prototype, "root", {
        get: function () {
            return this._root;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryTree.prototype, "maxWidth", {
        get: function () {
            return this._maxWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryTree.prototype, "maxDepth", {
        get: function () {
            return this._maxDepth;
        },
        enumerable: false,
        configurable: true
    });
    BinaryTree.prototype.add = function (data) {
        var newNode = new TreeNode(data, null, null);
        if (this._maxDepth <= this.getTreeDepth()) {
            throw new RangeError("Max depth is reached");
        }
        if (this._maxWidth <= this.getTreeWidth()) {
            throw new RangeError("Max width is reached");
        }
        if (this._root === null) {
            this._root = newNode;
            this._size++;
        }
        else if (this.checkExistData(this._root, data) === true) {
            throw new ExistError("This node is already exist");
        }
        else {
            this.addNode(this._root, newNode);
        }
    };
    // ?????????????????????????????? ?????????? ?????? add
    BinaryTree.prototype.addNode = function (parentNode, childNode) {
        if (childNode.data < parentNode.data) {
            if (parentNode.left === null) {
                parentNode.left = childNode;
                this._size++;
            }
            else {
                this.addNode(parentNode.left, childNode);
            }
        }
        else {
            if (parentNode.right === null) {
                parentNode.right = childNode;
                this._size++;
            }
            else {
                this.addNode(parentNode.right, childNode);
            }
        }
    };
    BinaryTree.prototype.remove = function (data) {
        this._root = this.deleteNode(this.root, data);
        this._size--;
    };
    // ?????????????????????????????? ?????????? ?????? delete
    BinaryTree.prototype.deleteNode = function (node, data) {
        if (node === null) {
            throw new ExistError("Node doesn't exist");
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
        var newNode = this.minNode(node.right);
        node.data = newNode.data;
        node.right = this.deleteNode(node.right, newNode.data);
        return node;
    };
    BinaryTree.prototype.minNode = function (node) {
        if (node.left === null) {
            return node;
        }
        return this.minNode(node.left);
    };
    BinaryTree.prototype.checkExistData = function (node, data) {
        if (node === null) {
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
    };
    BinaryTree.prototype.getTreeDepth = function () {
        return this.getDepth(this.root);
    };
    BinaryTree.prototype.getDepth = function (node) {
        if (node === null) {
            return 0;
        }
        var lpath = this.getDepth(node.left), rpath = this.getDepth(node.right);
        if (lpath < rpath) {
            return rpath + 1;
        }
        return lpath + 1;
    };
    BinaryTree.prototype.getTreeWidth = function () {
        var maxWidth = 0, width = 0;
        for (var i = 1; i < this.getTreeDepth(); i++) {
            width = this.getWidth(this.root, i);
            if (width > maxWidth) {
                maxWidth = width;
            }
        }
        return maxWidth;
    };
    BinaryTree.prototype.getWidth = function (node, level) {
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
    };
    BinaryTree.prototype.treeTraverse = function (callback) {
        if (this._root === null) {
            throw new ExistError("Root is doesn't exist");
        }
        this.preOrderTraverse(this._root, callback);
    };
    // ?????????????????????????????? ?????????? ?????? treeTraverse. ?? ???????????? ???????????? ???????????????????? ???????????????????????? ?????????? ????????????
    BinaryTree.prototype.preOrderTraverse = function (node, callback) {
        if (node === null) {
            return;
        }
        callback(node.data);
        this.preOrderTraverse(node.left, callback);
        this.preOrderTraverse(node.right, callback);
    };
    /*
      ??.??. ?? ???????? ?? ???????????? ???????????????????????? ?? ???????????? ???????????????????? ???????? ?? ????????,
      ???? ?????????? searchData ?????????? ???????????????????? ???????????? ???????????? - ?????????????? ????????????????,
      ?????????????? ???????????????? ???????????????????? ???? ???????????? ???????????????? ?? ????????????
    */
    BinaryTree.prototype.searchData = function (data) {
        if (this._root === null) {
            throw new ExistError("Root is doesn't exist");
        }
        return this.checkExistData(this._root, data);
    };
    return BinaryTree;
}());
export { BinaryTree };
//# sourceMappingURL=BinaryTree.js.map