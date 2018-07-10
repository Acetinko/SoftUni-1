using System;
using System.Collections.Generic;
using System.Linq;

class TWOxTwoSquaresInMatrix
{
    static void Main()
    {
        int[] input = Console.ReadLine()
            .Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)
            .Select(int.Parse)
            .ToArray();

        int rows = input[0], cols = input[1];
        char[,] matrix = new char[rows, cols];

        InputLine(matrix, rows);

        int countSquares = 0;

        for (int row = 0; row < matrix.GetLength(0) - 1; row++)
        {
            for (int col = 0; col < matrix.GetLength(1) - 1; col++)
            {
                char currentChar = matrix[row, col];
                bool isEqual =
                    currentChar == matrix[row, col + 1] &&
                     currentChar == matrix[row + 1, col] &&
                     currentChar == matrix[row + 1, col + 1];

                if (isEqual)
                {
                    countSquares++;
                }
            }
        }

        Console.WriteLine(countSquares);
    }

    private static void InputLine(char[,] matrix, int rows)
    {
        for (int row = 0; row < rows; row++)
        {
            char[] readLine = Console.ReadLine()
                .Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)
                .Select(char.Parse)
                .ToArray();

            if (readLine.Length != matrix.GetLength(1))
            {
                return;
            }

            for (int col = 0; col < matrix.GetLength(1); col++)
            {
                matrix[row, col] = readLine[col];
            }
        }
    }
}