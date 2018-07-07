using System;
using System.Collections.Generic;
using System.Linq;

class BasicQueueOperations
{
    static void Main(string[] args)
    {
        int[] firstInput = Input();
        int n = firstInput[0];
        int s = firstInput[1];
        int x = firstInput[2];

        int[] secondInput = Input();

        Queue<int> queue = new Queue<int>(secondInput);

        if (queue.Count >= s)
        {
            for (int i = 0; i < s; i++)
            {
                queue.Dequeue();
            }
        }

        if (queue.Contains(x))
        {
            Console.WriteLine("true");
            Environment.Exit(0);
        }

        if (queue.Count == 0)
        {
            Console.WriteLine(0);
            Environment.Exit(0);
        }

        Console.WriteLine(queue.Min());
    }

    private static int[] Input()
    {
        return Console.ReadLine()
            .Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)
            .Select(int.Parse)
            .ToArray();
    }
}
