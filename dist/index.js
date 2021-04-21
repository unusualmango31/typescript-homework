import { BinaryTree } from "./BinaryTree";
import { BinaryTreeDrawer } from "./BinaryTreeDrawer";
import "./style.css";
var bTree = new BinaryTree(8, 10), canvas = document.getElementById("canvas"), bTreeDrawer = new BinaryTreeDrawer(bTree, canvas, 15);
bTree.add(10);
bTree.add(5);
bTree.add(3);
bTree.add(7);
bTree.add(15);
bTree.add(13);
bTree.add(17);
bTree.treeTraverse(console.log);
bTreeDrawer.drawTree();
var addButton = document.getElementById("addButton"), deleteButton = document.getElementById("deleteButton"), inputAdd = document.getElementById("add"), inputDelete = document.getElementById("delete"), popup = document.getElementById("popup-wrapper"), popupButton = document.getElementsByClassName("popup__button")[0], popupMessage = document.getElementById("popup__errorMessage");
addButton.addEventListener("click", function () {
    if (inputAdd) {
        if (!isNaN(parseInt(inputAdd.value, 10))) {
            try {
                bTree.add(parseInt(inputAdd.value, 10));
                bTreeDrawer.drawTree();
            }
            catch (e) {
                if (popup) {
                    popup.style.display = "block";
                    if (e.message === "This node is already exist" && popupMessage) {
                        popupMessage.innerHTML = "Данный узел уже существует <br> Пожалуйста введите другое значение";
                    }
                }
            }
        }
        else {
            if (popup) {
                popup.style.display = "block";
                if (popupMessage) {
                    popupMessage.textContent = "Введите число";
                }
            }
        }
    }
    else {
        throw new Error("input doesn't exist");
    }
});
deleteButton.addEventListener("click", function () {
    if (inputDelete) {
        if (!isNaN(parseInt(inputDelete.value, 10))) {
            try {
                bTree.remove(parseInt(inputDelete.value, 10));
                bTreeDrawer.drawTree();
            }
            catch (e) {
                if (popup) {
                    popup.style.display = "block";
                    if (e.message === "Node doesn't exist" && popupMessage) {
                        popupMessage.innerHTML = "Данный узел не существует <br> Пожалуйста введите значение";
                    }
                }
            }
        }
        else {
            if (popup) {
                popup.style.display = "block";
                if (popupMessage) {
                    popupMessage.textContent = "Введите число";
                }
            }
        }
    }
    else {
        throw new Error("input doesn't exist");
    }
});
popupButton.addEventListener("click", function () {
    if (popup) {
        popup.style.display = "none";
    }
});
//# sourceMappingURL=index.js.map