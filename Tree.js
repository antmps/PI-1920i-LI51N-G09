'use strict'

import { isNull } from "util";

class Node {
  constructor(value, children) {
    this.value = value;
    this.children = children;
  }
}


class Tree {
    constructor(root) {
        this._root = root || null
    }

    _searchNode(parentValue){
        const self = this

        function goThrough(node){
            if(node.value === parentValue) return node
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