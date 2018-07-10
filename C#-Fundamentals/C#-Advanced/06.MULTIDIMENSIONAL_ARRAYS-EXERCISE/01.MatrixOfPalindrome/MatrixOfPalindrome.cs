using System;
using System.Linq;

class MatrixOfPalindrome
{
    static void Main()
    {
        int[] input = Console.ReadLine()
            .Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)
            .Select(int.Parse)
            .ToArray();

        int r = input[0], c = input[1];

        if (r + c > 27)
        {
            Environment.Exit(0);
        }

        string[,] matrix = new string[r, c];

        for (int row = 0; row < matrix.GetLength(0); row++)
        {
            for (int col = 0; col < matrix.GetLength(1); col++)
            {
                matrix[row, col] =
                    ((char)('a' + row)).ToString() +
                    (char)('a' + row + col) +
                    (char)('a' + row);
            }
        }

        for (int row = 0; row < matrix.GetLength(0); row++)
        {
            for (int col = 0; col < matrix.GetLength(1); col++)
            {
                Console.Write(matrix[row, col]);

                if (col < matrix.GetLength(1) - 1)
                {
                    Console.Write(" ");
                    continue;
                }
                Console.WriteLine();
            }
        }
    }
}