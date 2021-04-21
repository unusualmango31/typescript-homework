import { BinaryTree, TreeNode } from "./BinaryTree";

export class BinaryTreeDrawer <T> {
    private _context: CanvasRenderingContext2D | null;
    readonly _canvas: HTMLCanvasElement | null;
    private _x: number = 0;
    private _y: number = 0;


    constructor(private _tree: BinaryTree<T>, canvas: HTMLCanvasElement | null, private _nodeSize: number) {
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

    drawTree(): void {
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
    }

    private drawLeft(node: TreeNode<T>, x: number, y: number): void {
        const newX: number = x - this.generateNewCoordX(x, node),
              newY: number = y + this.generateNewCoordY(y);
        this.drawNode(node.data, newX, newY);
        if (node.left) {
            this.drawLeft(node.left, newX, newY);
        }
        if (node.right) {
            this.drawRight(node.right, newX, newY);
        }
    }

    private drawRight(node: TreeNode<T>, x: number, y: number): void {
        const newX: number = x + this.generateNewCoordX(x, node),
              newY: number = y + this.generateNewCoordY(y);
        this.drawNode(node.data, newX, newY);

        if (node.right) {
            this.drawRight(node.right, newX, newY);
        }
        if (node.left) {
            this.drawLeft(node.left, newX, newY);
        }
    }
    private drawLineLeft(node: TreeNode<T>, x: number, y: number): void {
        const newX: number = x - this.generateNewCoordX(x, node),
              newY: number = y + this.generateNewCoordY(y);
        this.drawLine(x, y, newX, newY);
        if (node.left) {
            this.drawLineLeft(node.left, newX, newY);
        }
        if (node.right) {
            this.drawLineRight(node.right, newX, newY);
        }
    }

    private drawLineRight(node: TreeNode<T>, x: number, y: number): void {
        const newX: number = x + this.generateNewCoordX(x, node),
              newY: number = y + this.generateNewCoordY(y);
        this.drawLine(x, y, newX, newY);

        if (node.right) {
            this.drawLineRight(node.right, newX, newY);
        }
        if (node.left) {
            this.drawLineLeft(node.left, newX, newY);
        }
    }

    private generateNewCoordX(x: number, node: TreeNode<T>): number {
        if (node === null) {
            throw new Error("Node not found");
        }
        return x * this._nodeSize / (this._tree.getWidth(this._tree.root, this._tree.getTreeDepth() - this._tree.getDepth(node) ) * 70 );
    }
    private generateNewCoordY(y: number): number {
        return this._nodeSize + this._tree.getTreeWidth() * this._nodeSize;
    }

    private drawNode(data: T, x: number, y: number): void {
        if (this._context === null) {
            throw new Error("Context not found");
        }
        const size: number = this._nodeSize;
        this._context.beginPath();
        this._context.arc(x, y, size, 0, Math.PI * 2);
        this._context.stroke();
        this._context.fillStyle = "white";
        this._context.arc(x, y, size, 0, Math.PI * 2);
        this._context.fill();
        this._context.textAlign = "center";
        this._context.textBaseline = "middle";
        this._context.fillStyle = "#000";
        this._context.fillText(<string><unknown>data, x, y);
    }

    private drawLine(x: number, y: number, newX: number, newY: number): void {
        if (this._context === null) {
            throw new Error("Context not found");
        }
        this._context.beginPath();
        this._context.moveTo(x, y);
        this._context.lineTo(newX, newY);
        this._context.stroke();
    }
}

