#include <iostream>
#include <fstream>
#include <algorithm>
#include <functional>
#include <array>

using namespace std;

int *score;
bool *bookdone;
int *libScores;

struct Library
{
    int nBooks;
    int signup;
    int ship;
    int totPoints;
    int *books;
};
Library *ll;
int libScore(Library l);

int main()
{

    ifstream in("./input/a_example.txt");

    int B, L, D;
    in >> B;
    in >> L;
    in >> D;

    score = new int[B];
    ll = new Library[L];
    libScores = new int[L];
    bookdone = new bool[B];
    for (int i = 0; i < B; i++)
        bookdone[i] = false;

    for (int i = 0; i < B; i++)
        in >> score[i];

    for (int i = 0; i < L; i++)
    {
        Library l;
        in >> l.nBooks;
        in >> l.signup;
        in >> l.ship;
        l.books = new int[l.nBooks];
        l.totPoints = 0;

        for (int j = 0; j < l.nBooks; j++)
        {
            int b;
            in >> b;
            l.books[j] = b;
            l.totPoints += score[b];
        }

        auto lambda = [](int a, int b) -> bool { return score[a] > score[b]; };
        size_t size = sizeof(l.books) / sizeof(l.books[0]);
        sort(l.books, l.books + size, lambda);

        for (int j = 0; j < l.nBooks; j++)
        {
            cout << score[l.books[j]] << " ";
        }
        cout << endl;

        ll[i] = l;
    }

    for (int i = 0; i < L; i++)
    {
        libScores[i] = libScore(ll[i]);
        cout << libScores[i] << endl;
    }

    return 0;
}

int libScore(Library l)
{
    int totPoint = 0;

    totPoint -= (l.signup * 3);
    totPoint += (l.ship * 3);
    totPoint += ((l.totPoints / l.nBooks) * 3);

    return totPoint;
}