using System;
using System.Linq;

class MaximalSum
{
    static void Main()
    {
        int[] input = Console.ReadLine()
            .Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)
            .Select(int.Parse)
            .ToArray();

        int rows = input[0], cols = input[1];
        int[,] matrix = new int[rows, cols];
        InputLine(matrix, rows);

        int maxSum = int.MinValue;
        int printRow = 0;
        int printCol = 0;

        for (int row = 0; row < matrix.GetLength(0) - 2; row++)
        {
            for (int col = 0; col < matrix.GetLength(1) - 2; col++)
            {
                int tmpSum = matrix[row, col] + matrix[row, col + 1] + matrix[row, col + 2];
                tmpSum += matrix[row + 1, col] + matrix[row + 1, col + 1] + matrix[row + 1, col + 2];
                tmpSum += matrix[row + 2, col] + matrix[row + 2, col + 1] + matrix[row + 2, col + 2];

                if (tmpSum > maxSum)
                {
                    maxSum = tmpSum;
                    printRow = row;
                    printCol = col;
                }
            }
        }

        Output(matrix, maxSum, printRow, printCol);
    }

    private static void Output(int[,] matrix, int maxSum, int printRow, int printCol)
    {
        Console.WriteLine($"Sum = {maxSum}");

        for (int row = printRow; row < printRow + 3; row++)
        {
            for (int col = printCol; col < printCol + 3; col++)
            {
                Console.Write(matrix[row, col]);

                if (col < printCol + 2)
                {
                    Console.Write(" ");
                    continue;
                }

                Console.WriteLine();
            }
        }
    }

    private static void InputLine(int[,] matrix, int rows)
    {
        for (int row = 0; row < rows; row++)
        {
            int[] readLine = Console.ReadLine()
                .Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)
                .Select(int.Parse)
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