class LinkingOrgan {
    constructor(value, left){
        this.value = value;
        this.parent = NaN;
        this.child = NaN;
        this.left = left;
    }
    update_value(value){
        this.value = value;
    }
    InsertionToTheList(parent, child){
        this.parent = parent;
        this.child = child;
    }
}
class RecentOrgans{
    constructor(left,value,right){
        this.value = value;
        this.left = left;
        this.right = right;
    }
}
class RowList {
    constructor(firstName, lastName, phoneNumber, email, role){
        this.firstName = new LinkingOrgan(firstName,lastName);
        this.lastName= new RecentOrgans(firstName,lastName,phoneNumber);
        this.phoneNumber = new RecentOrgans(lastName,phoneNumber,email);
        this.email = new RecentOrgans(phoneNumber,email,role);
        this.role = new RecentOrgans(email,role,NaN);
    }
}
class MyList {
    constructor(){
        this.start = NaN;
        this.end = NaN;
        this.number = 0;
    }

    add (firstName, lastName, phoneNumber, email, role){
        const value = new RowList(firstName, lastName, phoneNumber, email, role);
        if (this.number === 0){
            this.start = value.firstName;
            this.end = value.firstName;
        }
        else{
            value.firstName.parent = this.end;
            this.end = value.firstName;

        }
        this.number ++;
    }

    remove(firstName){
        if(this.number !== 0){
            if (firstName.parent === NaN){
                firstName.child.parent = NaN;
                this.start = firstName.child;
            }else if(firstName.child === NaN){
                firstName.parent.child = NaN;
                this.end = firstName.parent;
            }
            this.number --;
        }
    }
}