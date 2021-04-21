var BinaryTreeDrawer = /** @class */ (function () {
    function BinaryTreeDrawer(_tree, canvas, _nodeSize) {
        this._tree = _tree;
        this._nodeSize = _nodeSize;
        this._x = 0;
        this._y = 0;
        if (canvas === null) {
            throw new Error("Canvas not found");
        }
        this._canvas = canvas;
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        this._context = canvas.getContext("2d");
        this._x = this._canvas.width / 2;
        this._y = 50;
    }
    BinaryTreeDrawer.prototype.drawTree = function () {
        if (this._canvas === null) {
            throw new Error("Canvas doesn't exist");
        }
        if (this._context === null) {
            throw new Error("Context doesn't exist");
        }
        if (this._tree.root === null) {
            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
            throw new Error("Root doesn't exist");
        }
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        if (this._tree.root.left !== null) {
            this.drawLineLeft(this._tree.root.left, this._x, this._y);
            this.drawLeft(this._tree.root.left, this._x, this._y);
        }
        if (this._tree.root.right !== null) {
            this.drawLineRight(this._tree.root.right, this._x, this._y);
            this.drawRight(this._tree.root.right, this._x, this._y);
        }
        this.drawNode(this._tree.root.data, this._x, this._y);
    };
    BinaryTreeDrawer.prototype.drawLeft = function (node, x, y) {
        var newX = x - this.generateNewCoordX(x, node), newY = y + this.generateNewCoordY(y);
        this.drawNode(node.data, newX, newY);
        if (node.left) {
            this.drawLeft(node.left, newX, newY);
        }
        if (node.right) {
            this.drawRight(node.right, newX, newY);
        }
    };
    BinaryTreeDrawer.prototype.drawRight = function (node, x, y) {
        var newX = x + this.generateNewCoordX(x, node), newY = y + this.generateNewCoordY(y);
        this.drawNode(node.data, newX, newY);
        if (node.right) {
            this.drawRight(node.right, newX, newY);
        }
        if (node.left) {
            this.drawLeft(node.left, newX, newY);
        }
    };
    BinaryTreeDrawer.prototype.drawLineLeft = function (node, x, y) {
        var newX = x - this.generateNewCoordX(x, node), newY = y + this.generateNewCoordY(y);
        this.drawLine(x, y, newX, newY);
        if (node.left) {
            this.drawLineLeft(node.left, newX, newY);
        }
        if (node.right) {
            this.drawLineRight(node.right, newX, newY);
        }
    };
    BinaryTreeDrawer.prototype.drawLineRight = function (node, x, y) {
        var newX = x + this.generateNewCoordX(x, node), newY = y + this.generateNewCoordY(y);
        this.drawLine(x, y, newX, newY);
        if (node.right) {
            this.drawLineRight(node.right, newX, newY);
        }
        if (node.left) {
            this.drawLineLeft(node.left, newX, newY);
        }
    };
    BinaryTreeDrawer.prototype.generateNewCoordX = function (x, node) {
        if (node === null) {
            throw new Error("Node not found");
        }
        return x * this._nodeSize / (this._tree.getWidth(this._tree.root, this._tree.getTreeDepth() - this._tree.getDepth(node)) * 70);
    };
    BinaryTreeDrawer.prototype.generateNewCoordY = function (y) {
        return this._nodeSize + this._tree.getTreeWidth() * this._nodeSize;
    };
    BinaryTreeDrawer.prototype.drawNode = function (data, x, y) {
        if (this._context === null) {
            throw new Error("Context not found");
        }
        var size = this._nodeSize;
        this._context.beginPath();
        this._context.arc(x, y, size, 0, Math.PI * 2);
        this._context.stroke();
        this._context.fillStyle = "white";
        this._context.arc(x, y, size, 0, Math.PI * 2);
        this._context.fill();
        this._context.textAlign = "center";
        this._context.textBaseline = "middle";
        this._context.fillStyle = "#000";
        this._context.fillText(data, x, y);
    };
    BinaryTreeDrawer.prototype.drawLine = function (x, y, newX, newY) {
        if (this._context === null) {
            throw new Error("Context not found");
        }
        this._context.beginPath();
        this._context.moveTo(x, y);
        this._context.lineTo(newX, newY);
        this._context.stroke();
    };
    return BinaryTreeDrawer;
}());
export { BinaryTreeDrawer };
//# sourceMappingURL=BinaryTreeDrawer.js.map