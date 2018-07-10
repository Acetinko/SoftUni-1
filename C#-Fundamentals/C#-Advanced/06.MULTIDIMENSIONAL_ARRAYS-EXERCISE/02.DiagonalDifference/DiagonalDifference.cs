using System;
using System.Linq;

class DiagonalDifference
{
    static void Main()
    {
        int sizeMatrix = int.Parse(Console.ReadLine());

        int[,] matrix = new int[sizeMatrix, sizeMatrix];

        InputLine(matrix, sizeMatrix);

        long primaryDiagonal = 0;
        long secondaryDiagonal = 0;

        for (int i = 0; i < matrix.GetLength(0); i++)
        {
            primaryDiagonal += matrix[i, i];
            secondaryDiagonal += matrix[i, (matrix.GetLength(0) - 1) - i];
        }

        Console.WriteLine(Math.Abs(primaryDiagonal - secondaryDiagonal));
    }

    private static void InputLine(int[,] matrix, int sizeMatrix)
    {
        for (int count = 0; count < sizeMatrix; count++)
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
                matrix[count, col] = readLine[col];
            }
        }
    }
}