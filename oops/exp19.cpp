// #include<iostream>
// using namespace std;

// void display(int x){
//     cout<<x<<endl;
// }
// void display(double x){
//     cout<<x<<endl;
// }
// void display(string x){
//     cout<<x<<endl;
// }
// int main(){
//     display(10);
//     display(45.55);
//     display("sam");

//     return 0;

// }

#include<iostream>
using namespace std;

template <class T>
void display(T a){
    cout<<a<<endl;
}

int main(){
    display(10);
    display(45.55);
    display("sam");

    return 0;
    
}