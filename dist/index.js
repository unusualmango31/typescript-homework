import { BinaryTree } from "./BinaryTree";
import { BinaryTreeDrawer } from "./BinaryTreeDrawer";
import "./style.css";
var bTree = new BinaryTree(8, 10), canvas = document.getElementById("canvas"), bTreeDrawer = new BinaryTreeDrawer(bTree, canvas, 15);
bTree.add(15);
bTree.add(5);
bTree.add(2);
bTree.add(7);
bTree.add(25);
bTree.add(30);
bTree.add(18);
bTree.treeTraverse(console.log);
bTreeDrawer.drawTree();
var addButton = document.getElementById("addButton"), deleteButton = document.getElementById("deleteButton"), inputAdd = document.getElementById("add"), inputDelete = document.getElementById("delete");
addButton.addEventListener("click", function () {
    if (inputAdd) {
        if (!isNaN(parseInt(inputAdd.value, 10))) {
            bTree.add(parseInt(inputAdd.value, 10));
            bTreeDrawer.drawTree();
        }
        else {
            alert("Введите число");
        }
    }
    else {
        alert("Введите значение");
    }
});
deleteButton.addEventListener("click", function () {
    if (inputDelete) {
        if (!isNaN(parseInt(inputDelete.value, 10))) {
            bTree.remove(parseInt(inputDelete.value, 10));
            bTreeDrawer.drawTree();
        }
        else {
            alert("Введите число");
        }
    }
    else {
        alert("Введите значение");
    }
});
//# sourceMappingURL=index.js.map