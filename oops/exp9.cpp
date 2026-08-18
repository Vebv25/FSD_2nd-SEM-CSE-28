#include <iostream>
using namespace std;

class Student {
private:
    int section;
    string name;

public:
    void getData() {
        cout << "Enter Section : ";
        cin >> section;

        cout << "Enter Name: ";
        cin >> name;
    }

    inline void display() {
        cout << "Enter Section : " << section << endl;
        cout << "Name: " << name << endl;
    }
};

int main() {
    Student v;

    v.getData();
    v.display();

    return 0;
}