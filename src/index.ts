import { BinaryTree } from "./BinaryTree";
import { BinaryTreeDrawer } from "./BinaryTreeDrawer";
import "./style.css";

const bTree = new BinaryTree<number>(8, 10),
      canvas: HTMLCanvasElement | null = document.getElementById("canvas") as HTMLCanvasElement,
      bTreeDrawer = new BinaryTreeDrawer(bTree, canvas, 15);

bTree.add(15);
bTree.add(5);
bTree.add(2);
bTree.add(7);
bTree.add(25);
bTree.add(30);
bTree.add(18);
bTree.treeTraverse(console.log);


bTreeDrawer.drawTree();

const addButton = document.getElementById("addButton") as HTMLInputElement,
      deleteButton = document.getElementById("deleteButton") as HTMLInputElement,
      inputAdd: HTMLInputElement | null = document.getElementById("add") as HTMLInputElement,
      inputDelete: HTMLInputElement | null = document.getElementById("delete") as HTMLInputElement;


addButton.addEventListener("click", () => {
    if (inputAdd) {
        if (!isNaN(parseInt(inputAdd.value, 10))) {
            bTree.add(parseInt(inputAdd.value, 10));
            bTreeDrawer.drawTree();
        } else {
            alert("Введите число");
        }
    } else {
        alert("Введите значение");
    }
});
deleteButton.addEventListener("click", () => {
    if (inputDelete) {
        if (!isNaN(parseInt(inputDelete.value, 10))) {
            bTree.remove(parseInt(inputDelete.value, 10));
            bTreeDrawer.drawTree();
        } else {
            alert("Введите число");
        }
    } else {
        alert("Введите значение");
    }
});



