import {MyList} from './myListData.js'
var data_list = new MyList();
var data_arry = NaN;

function add_row(firstName, lastName, phoneNumber, email, role){
    data_list.add(firstName, lastName, phoneNumber, email, role);
}

function remove_row (index){
    data_list.remove(data_arry[index]);
}

function update_firstName (index,value){
    data_arry[index] = value;
}

function update_lastName (index,value){
    data_arry[index].left = value;
}

function update_phoneNumber (index,value){
    data_arry[index].left.left = value;
}

function update_email (index,value){
    data_arry[index].left.left.left = value;
}

function update_role (index,value){
    data_arry[index].left.left.left = value;
}

function data_arry (start){
    const arrary = []
    if(data_list.start !== NaN){
        organ = start;
        for(let i = 0; i < data_list.number; i++){
            arrary.push(organ);
            organ = organ.child;
        }
    }
    data_arry = arrary;
}