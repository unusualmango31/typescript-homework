import { BinaryTree } from "./BinaryTree";
import { BinaryTreeDrawer } from "./BinaryTreeDrawer";
import "./style.css";

const bTree = new BinaryTree<number>(8, 10),
      canvas: HTMLCanvasElement | null = document.getElementById("canvas") as HTMLCanvasElement,
      bTreeDrawer = new BinaryTreeDrawer(bTree, canvas, 15);

bTree.add(10);
bTree.add(5);
bTree.add(3);
bTree.add(7);
bTree.add(15);
bTree.add(13);
bTree.add(17);
bTree.treeTraverse(console.log);


bTreeDrawer.drawTree();

const addButton = document.getElementById("addButton") as HTMLInputElement,
      deleteButton = document.getElementById("deleteButton") as HTMLInputElement,
      inputAdd: HTMLInputElement | null = document.getElementById("add") as HTMLInputElement,
      inputDelete: HTMLInputElement | null = document.getElementById("delete") as HTMLInputElement,
      popup = document.getElementById("popup-wrapper"),
      popupButton = document.getElementsByClassName("popup__button")[0],
      popupMessage: HTMLElement | null = document.getElementById("popup__errorMessage");


addButton.addEventListener("click", () => {
    if (inputAdd) {
        if (!isNaN(parseInt(inputAdd.value, 10))) {
            try {
                bTree.add(parseInt(inputAdd.value, 10));
                bTreeDrawer.drawTree();
            } catch (e) {
                if (popup) {
                    popup.style.display = "block";
                    if (e.message === "This node is already exist" && popupMessage) {
                        popupMessage.innerHTML  = "Данный узел уже существует <br> Пожалуйста введите другое значение";
                    }
                }
            }
        } else {
            if (popup) {
                popup.style.display = "block";
                if (popupMessage) {
                    popupMessage.textContent   = "Введите число";
                }
            }
        }
    } else {
        throw new Error("input doesn't exist");
    }
});
deleteButton.addEventListener("click", () => {
    if (inputDelete) {
        if (!isNaN(parseInt(inputDelete.value, 10))) {
            try {
                bTree.remove(parseInt(inputDelete.value, 10));
                bTreeDrawer.drawTree();
            } catch (e) {
                if (popup) {
                    popup.style.display = "block";
                    if (e.message === "Node doesn't exist" && popupMessage) {
                        popupMessage.innerHTML = "Данный узел не существует <br> Пожалуйста введите значение";
                    }
                }
            }
        } else {
            if (popup) {
                popup.style.display = "block";
                if (popupMessage) {
                    popupMessage.textContent  = "Введите число";
                }
            }
        }
    } else {
        throw new Error("input doesn't exist");
    }
});

popupButton.addEventListener("click", () => {
    if (popup) {
        popup.style.display = "none";
    }
});



