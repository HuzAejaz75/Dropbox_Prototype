#ifndef BANK_H
#define BANK_H

using namespace std;

class Bank {
public:
    Bank();
    void setallocation(int Allocation[10][10], int& n, int& m);
    void setmaxallocation(int Maximum[10][10], int& n, int& m);
    void setavailable(int& m, int Work[1][10]);
    int getallocation(int Allocation[10][10], int i, int j);
    void findneed(int&n, int&m, int Need[10][10], int Allocation[10][10], int Maximum[10][10], int Work[1][10]);
    int getmaxallocation(int Maximum[10][10], int i, int j);
    void setprocesses(int n);
    void setresources(int m);
    void print(int x[][10], int n, int m);

    bool Is_Safe(int Allocation[][10], int Need[][10], int Available[1][10], int n, int m, int a[]);
    void accept(int Allocation[][10], int Need[][10], int Maximum[10][10], int Work[1][10], int n, int m);
    int post_check(int Allocation[][10], int Need[][10], int Work[1][10], int n, int m, int is_safe, int a[]);
    void resource_request(int Allocation[10][10], int Need[10][10], int Available[10][10], int pid, int m);

private:

    int **Allocation;
    int **Maximum;
    int **Need;
    int **Work;
    int n, m, pid, ch;
};


#endif // BANK_H

Bank.cpp
#include <iostream>
#include <iterator>
#include <algorithm>
#include "./bank.h"
using namespace std;

Bank::Bank()//default constructor
{
    m = 0;
    n = 0;
    pid = 0;

    this->Allocation = Allocation;
    Maximum = new int*[10];
    for (int i = 0; i < 10; i++)
        Maximum[i] = new int[10];
    Need = new int*[10];
    for (int i = 0; i < 10; i++)
        Need[i] = new int[10];

    Work = new int*[1];
    for (int i = 0; i < 10; i++)
        Work[i] = new int[10];
}

void Bank::setallocation(int Allocation[10][10], int& n, int& m)
{
    int i = 0;

    while (i < n) {
        cout << endl
             << "Process   " << i + 1 << endl; // For each process takes the input for the Allocation matrix
        int j = 0;
        while (j < m) {
            cout << " Allocation for resource " << j + 1 << ":";
            cin >> Allocation[i][j];
            j++;
        }
        i++;
    }
}

void Bank::setmaxallocation(int Maximum[10][10], int& n, int& m)// Sets the Maximum Allocation Matrix
{
    int i = 0;
    while (i < n) {
        cout << endl
             << "Process " << endl
             << i + 1;
        int j = 0;
        while (j < m) {
            cout << " Maximum for resource " << j + 1 << ":";
            cin >> Maximum[i][j];
            j++;
        }
        i++;
    }
}

int Bank::getallocation(int Allocation[10][10], int i, int j)//returns the Allocation Matrix
{
    return Allocation[i][j];
}

int Bank::getmaxallocation(int Maximum[10][10], int i, int j)//Returns the Maximum Allocation Matrix
{
    return Maximum[i][j];
}

void Bank::setprocesses(int n)
{
    this->n = n;
}

void Bank::setresources(int m)
{
    this->m = m;
}

void Bank::setavailable(int& m, int Work[1][10])//sets the available resources matrix
{
    int i = 0;
    while (i < m) {
        cout << " Resource" << i + 1 << ":";
        cin >> Work[0][i];
        i++;
    }
}

void Bank::findneed(int& n, int& m, int Need[10][10], int Allocation[10][10], int Maximum[10][10], int Work[1][10])
{
    int i, j;
    for (i = 0; i < n; i++)
        for (j = 0; j < m; j++) {
            Need[i][j] = getmaxallocation(Maximum, i, j) - getallocation(Allocation, i, j);
        }
}

void Bank::print(int x[][10], int n, int m) //prints the output of the Matrix
{
    int i = 0;
    while (i < n) {
        cout << endl;
        int j = 0;
        while (j < m) {
            cout << "  " << x[i][j];
            j++;
        }
        i++;
    }
}

void Bank::resource_request(int Allocation[10][10], int Need[10][10], int Available[10][10], int pid, int m)
{
    int request[1][10];
    int i = 0;
    cout << "ENTER MORE REQUEST: " << endl;
    while (i < m) {
        cout << " Request for resource-" << i + 1 << " ";
        cin >> request[0][i];
        i++;
    }
    i = 0;
    while (i < m) {
        if (request[0][i] > Need[pid][i]) {
            cout << endl
                 << " Error encountered" << endl;
            abort();
        }
        i++;
    }
    i = 0;
    while (i < m) {
        if (request[0][i] > Available[0][i]) {
            cout << endl
                 << "Resources unavailable" << endl;
            abort();
        }
        i++;
    }
    i = 0;
    while (i < m) {
        Available[0][i] = Available[0][i] - request[0][i];
        Allocation[pid][i] = Allocation[pid][i] + request[0][i];
        Need[pid][i] = Need[pid][i] - request[0][i];
        i++;
    }
}

int Bank::post_check(int Allocation[][10], int Need[][10], int Work[1][10], int n, int m, int is_safe, int process[])
{

    if (is_safe != 0) {
        cout << endl
             << endl;
        int i = 0;
        while (i < n) {
            cout << " P " << process[i];
            i++;
        }
        cout << endl
             << "The system is in a Safe State" << endl;
        return 1;
    }
    else {
        cout << endl
             << "The system has entered a Deadlock" << endl;
        return 0;
    }
}

bool Bank::Is_Safe(int Allocation[][10], int Need[][10], int Available[1][10], int n, int m, int process[])
{

    int i = 0;
    int j = 0;
    int iter = 0;
    int index = 0;
    int Finish[10], Work[1][10];
    int flag1 = 0;
    bool flag2 = 0;
    i = 0;
    while (i < n) { // initialize the Finish array elements to 0, indicating that the processes have not finished executing
        Finish[i] = 0;
        i++;
    }
    i = 0;
    while (i < m) {
        Work[0][i] = Available[0][i]; // copy the elements of Available Matrix to the Work Matrix
        i++;
    }
    for (iter = 0; iter < n; iter++) {
        for (i = 0; i < n; i++) {
            if (Finish[i] == 0) //if the process has not finished executing
            {
                flag2 = 0; //set flag to zero
                j = 0;
                while (j < m) {
                    if (Need[i][j] > Work[0][j]) //check if need is greater than what's available, if yes set flag2 to 1
                        flag2 = 1;
                    j++;
                }
                if (flag2 == 0 && Finish[i] == 0) { //if the need < work and the process has not finished executing
                    j = 0;
                    while (j < m) {
                        Work[0][j] = Work[0][j] + Allocation[i][j]; //the process has finished executing and hence we deallocate its resources and it to Work matrix
                        j++;
                    }
                    Finish[i] = 1; //set the array index to 1, indicating the process represented by the index has finished executing
                    flag1++; // gives the count of the resources
                    process[index++] = i;
                }
            }
        }
        if (flag1 == n) //if it matches the number of resources, it means the array is safe hence return 1
            return 1;
    }
    return 0; //zero is returned if the state is unsafe
}

Main.cpp:
#include <iostream>
#include <cstdlib>
#include <string>
#include <vector>
#include <iterator>
#include "./bank.h"
using namespace std;

int main() {
    int ret;
    int Alloc[10][10], Max_res[10][10], Need[10][10], Available[1][10], n, m, p_id; //Declare and Initialize arrays and variables
    char choice;
    Bank* b = new Bank();
    cout << endl << "Hello, This Is Banker's Algorithm By Huzaifa Aejaz, Siddharth Gore and Bohan Liu" << endl<<endl;

    cout << "How many processes would you like to create? ";
    cin>>n;
    b->setprocesses(n);//pass the input to the setprocess method
    cout << endl << " How many resources would like to have?";

    cin>>m;
    b->setresources(m);
    b->setallocation(Alloc, n, m);
    b->setmaxallocation(Max_res, n, m);
    cout << endl << "Available resources :" << endl;
    b->setavailable(m, Available);

    b->findneed(n, m, Need, Alloc, Max_res, Available);

    cout << endl << "Allocation Matrix";
    b->print(Alloc, n, m);
    cout << endl << "Maximum Requirement Matrix";
    b->print(Max_res, n, m);
    cout << endl << "Need Matrix";
    b->print(Need, n, m);
    int a[10];
    int is_safe = b->Is_Safe(Alloc, Need, Available, n, m, a);
    ret = b->post_check(Alloc, Need, Available, n, m, is_safe, a);
    if (ret != 0)
        {
            cout << "Do you want to make an additional request ? " << endl;
            cout << "Press Y/y for Yes or any other key to exit)";
            cin  >> choice;
            if (choice == 'Y' || choice == 'y') //If the user wants to execute an additional request 
            {
                cout << " Enter process no. : ";
                cin>>p_id;
                b->resource_request(Alloc, Need, Available, p_id - 1, m);
                int c[10];
                int is_safe = b->Is_Safe(Alloc, Need, Available, n, m, c);
                ret = b->post_check(Alloc, Need, Available, n, m, is_safe, c);
                if (ret == 0) // if state is unsafe
                abort();
            }
        }
    return 0;
}



