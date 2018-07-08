using System;
using System.Linq;

class GroupNumbers
{
    static void Main()
    {
        int[] numbers = Console.ReadLine()
                .Split(',')
                .Select(int.Parse)
                .ToArray();

        int[] sizes = new int[3];

        foreach (int number in numbers)
        {
            sizes[Math.Abs(number % 3)]++;
        }

        int[][] jaggedArr = new int[3][];
        for (int i = 0; i < sizes.Length; i++)
        {
            jaggedArr[i] = new int[sizes[i]];
        }

        int[] index = new int[3];
        foreach (int number in numbers)
        {
            int remainder = Math.Abs(number % 3);
            jaggedArr[remainder][index[remainder]] = number;
            index[remainder]++;
        }

        for (int row = 0; row < jaggedArr.GetLength(0); row++)
        {
            Console.WriteLine(String.Join(" ", jaggedArr[row]));
        }
    }
}