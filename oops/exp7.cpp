#include <iostream>
using namespace std;

// class Student {
// public:
// int name;
// int rollNumber;
//     void study() {
//         cout << "Student is Working"<<name<<" "<<rollNumber<<endl;
//     }
// };

// int main() {
//     Student E; 
//     E.name = "Alice";
//     E.rollNumber = 123;

//     E.study();   

//     return 0;
// }
// int n = 10;

// int main() {
//     int n = 20;

//     cout << n;     // 20 → local
//     cout << ::n;   // 10 → global
// }



// class example {
// private:
//     int a, b;

// public:
//     void getdata();
//     void print();
// };


// void example::getdata() {
//     cout << "Enter the value of a and b: ";
//     cin >> a >> b;
// }

// void example::print() {
//     cout << "Value of a is: " << a << endl;
//     cout << "Value of b is: " << b << endl;
// }

// int main() {

//     example E;      

//     E.getdata();     
//     E.print();       

//     return 0;
// }


class Example {
    int a, b;

public:
    void getData(int, int);
    int printData();
};

void Example::getData(int x, int y) {
    a = x;
    b = y;
}

int Example::printData() {
    return a + b;
}

int main() {
    Example E;

    E.getData(10, 20);

    cout << "Sum = " << E.printData();

    return 0;
}