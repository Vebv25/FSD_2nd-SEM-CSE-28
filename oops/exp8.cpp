#include <iostream>
using namespace std;

class Circle
{
public:
    void getdata(float r)
    {
        float area = 3.14 * r * r;
        getprint(area);
    }

    void getprint(float area)
    {
        cout << "Area of Circle = " << area << endl;
    }
};

int main()
{
    Circle obj;

    float radius;
    cout << "Enter radius: ";
    cin >> radius;

    obj.getdata(radius);

    return 0;
}