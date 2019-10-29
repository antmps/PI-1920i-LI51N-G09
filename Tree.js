'use strict'

import { isNull } from "util";

class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}


class Tree {
    constructor(root) {
        this._root = root || null
    }

    _searchNode(searchValue){
        const self = this

        function goThrough(node){
            if(node.value === searchValue) return node
            node.children.array.forEach(element => {
                if(element.value === node) return element
                if(!element.children.isNull) goThrough(element)
            });
        }
        
        goThrough(this._root)
    }

    _addNode(value, parentValue){
        const newNode = {
            value,
            children: []
        }

        if(this._root === null){
            this._root = newNode
            return
        }
    }   

}