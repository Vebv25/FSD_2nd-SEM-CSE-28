#include <iostream>
using namespace std;

int main() {
    int n = 5;

    int at[] = {0, 1, 2, 4, 6};
    int bt[] = {5, 3, 8, 6, 4};

    int ct[5], wt[5], tat[5];

    ct[0] = at[0] + bt[0];

    for (int i = 1; i < n; i++) {
        if (ct[i - 1] < at[i])
            ct[i] = at[i] + bt[i];
        else
            ct[i] = ct[i - 1] + bt[i];
    }

    for (int i = 0; i < n; i++) {
        tat[i] = ct[i] - at[i];
        wt[i] = tat[i] - bt[i];
    }

    cout << "Process\tAT\tBT\tCT\tWT\tTAT\n";

    for (int i = 0; i < n; i++) {
        cout << "P" << i + 1 << "\t"
             << at[i] << "\t"
             << bt[i] << "\t"
             << ct[i] << "\t"
             << wt[i] << "\t"
             << tat[i] << endl;
    }

    return 0;
}