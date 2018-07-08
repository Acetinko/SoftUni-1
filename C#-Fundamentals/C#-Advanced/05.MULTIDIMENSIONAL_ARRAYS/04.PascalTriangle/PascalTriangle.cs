using System;

class PascalTriangle
{
    static void Main()
    {
        long height = long.Parse(Console.ReadLine());

        long[][] triangle = new long[height][];
        int currentWidth = 1;

        for (int currentHeight = 0; currentHeight < height; currentHeight++)
        {
            triangle[currentHeight] = new long[currentWidth];

            triangle[currentHeight][0] = 1;
            triangle[currentHeight][currentWidth - 1] = 1;

            if (currentWidth > 2)
            {
                for (int widthCounter = 1; widthCounter < currentWidth - 1; widthCounter++)
                {
                    triangle[currentHeight][widthCounter] =
                        triangle[currentHeight - 1][widthCounter - 1] +
                        triangle[currentHeight - 1][widthCounter];
                }
            }
            currentWidth++;
        }

        foreach (long[] tr in triangle)
        {
            Console.WriteLine(String.Join(" ", tr));
        }
    }
}