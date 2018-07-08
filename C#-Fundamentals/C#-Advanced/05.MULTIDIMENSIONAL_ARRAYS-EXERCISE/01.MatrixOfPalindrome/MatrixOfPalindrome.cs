using System;
using System.Linq;

class MatrixOfPalindrome
{
    static void Main()
    {
        int[] input = "4 6"//Console.ReadLine()
            .Split(" ")
            .Select(int.Parse)
            .ToArray();

        int r = input[0];
        int c = input[1];

        if (r + c > 27)
        {
            Environment.Exit(0);
        }

        string[,] matrix = new string[r, c];
        char[] chArr = new char[3] { 'a', 'a', 'a' };

        for (int row = 0; row < matrix.GetLength(0); row++)
        {
            for (int col = 0; col < matrix.GetLength(1); col++)
            {
                //Console.WriteLine();
                matrix[row,col] = $"{col + chArr[0]}{col + chArr[1]}{col + chArr[2]}";
            }
        }
    }
}